const CompanyModel = require("../../model/company_model");
const OtpModel = require("../../model/otp_model");
const ApiError = require("../../utils/error");
const cloudinary = require("../../utils/cloudinary");
const generateOtp = require("../../utils/generate_otp");
const transporter = require("../../utils/transporter");
const fs = require("fs");
const path = require("path");
const EmployeeModel = require("../../model/employee_model");
const { compareHash, hashPassword } = require("../../utils/hash")
const { EMPLOYEE_ROLE, COMPANY_ROLE, FOLDER_NAME } = require("../../config/string")
const { createCompanyValidation, employeeValidation } = require("../../config/joi.validation");


async function verifyEmail(req, res, next) {
    try {
        const { email } = req.body;
        const filePath = path.join(__dirname, "../../../public/otp.html");
        let htmlData = fs.readFileSync(filePath, "utf-8");
        const otp = generateOtp();
        htmlData = htmlData.replace("${otp}", otp);
        transporter.sendMail({
            to: email,
            subject: "Verify email",
            html: htmlData,
        }, async (err, _result) => {
            if (err) {
                return next(new ApiError(400, err.message));
            }
            await OtpModel.deleteMany({ email: email });
            const otpModel = new OtpModel({ email, otp });
            await otpModel.save();
            setTimeout(async () => {
                await OtpModel.findByIdAndDelete(otpModel._id);
            }, 1000 * 60);
            res.status(200).json({ statusCode: 200, success: true, message: "Otp send your email" });
        });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function verifyOtp(req, res, next) {
    try {
        const { email, otp } = req.body;
        const findOtp = await OtpModel.findOne({ email });
        if (!findOtp) {
            return next(new ApiError(400, "Please! enter otp "));
        }
        if (findOtp.otp !== otp) {
            return next(new ApiError(400, "Otp is wrong"));
        }
        await OtpModel.deleteMany({ email: email });
        res.status(200).json({ statusCode: 200, success: true, message: "Otp is write" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function createCompany(req, res, next) {
    try {
        const companyValidation = createCompanyValidation.validate(req.body)
        if (companyValidation.error) {
            return next(new ApiError(403, companyValidation.error.details[0].message))
        }

        const { email } = req.body;
        const findCompany = await CompanyModel.findOne({ email });
        if (findCompany) {
            return next(new ApiError(400, "Email already exist"));
        }
        const file = req.file;
        if (!file) {
            return next(new ApiError(403, "Company logo is required"));
        }
        const path = file.path;
        const result = await cloudinary.uploader.upload(path, { folder: FOLDER_NAME });
        req.body.logo = result.secure_url;
        req.body.publicId = result.public_id;
        fs.unlinkSync(path);
        const company = new CompanyModel(req.body);
        await company.save();
        res.status(201).json({ statusCode: 201, success: true, message: "New comapany created" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function updateCompany(req, res, next) {
    try {
        debugger
        delete req.body.email;
        delete req.body.password;
        const id = req.id;
        const file = req.file;
        if (file) {
            const path = file.path;
            const result = await cloudinary.uploader.upload(path, { folder: FOLDER_NAME });
            req.body.logo = result.secure_url;
            req.body.publicId = result.public_id;
            await cloudinary.uploader.destroy(req.user.publicId);
            fs.unlinkSync(path);
        }
        await CompanyModel.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ statusCode: 200, success: true, message: "Detail updated successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function deleteCompany(req, res, next) {
    try {
        const id = req.id;
        const company = await CompanyModel.findOneAndDelete({ _id: id });
        await cloudinary.uploader.destroy(company.publicId);
        res.status(200).json({ statusCode: 200, success: true, message: "company delete successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function viewCompanyOrProfile(req, res, next) {
    try {
        if (req.role === EMPLOYEE_ROLE) {
            const employee = await EmployeeModel.findById({ _id: req.id }).populate([{
                path: 'department'
            }, {
                path: 'designation'
            }, {
                path: "company",
                select: {
                    email: 1,
                    logo: 1,
                    name: 1,
                }
            }]);
            res.status(200).json({ statusCode: 200, success: true, data: employee });
            
        }
        else {
            const id = req.id
            const company = await CompanyModel.findById({ _id: id }).populate("workCategory");
            res.status(200).json({ statusCode: 200, success: true, data: company });
        }
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function addEmployee(req, res, next) {
    try {
        const id = req.id;
        const findEmployee = await EmployeeModel.findOne({ email: req.body.email, company: id });
        if (findEmployee) {
            return next(new ApiError(400, "Already contain this email in your company"))
        }
        req.body.company = id;

        const empValid = employeeValidation.validate(req.body)
        if (empValid.error) {
            return next(new ApiError(403, empValid.error.details[0].message))
        }

        const employee = new EmployeeModel(req.body);
        await employee.save();
        res.status(201).json({ statusCode: 201, success: true, message: "Employee added successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function deleteEmployee(req, res, next) {
    try {
        const employeeId = req.params.id;
        if (!employeeId) {
            return next(new ApiError(400, "Enter valid employee id"));
        }
        const id = req.id;
        await EmployeeModel.findByIdAndUpdate({ company: id, _id: req.params.id }, { $set: { isWorking: false } }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, message: "Employee delete successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function getEmployee(req, res, next) {
    try {
        const employees = await EmployeeModel.find({ company: req.id, isWorking: true })
        .populate("department")
        .populate("designation")
        .sort({ createdAt: -1 });
        
        res.status(200).json({ statusCode: 200, success: true, data: employees });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function changePassword(req, res, next) {
    try {
        const { id, role } = req;
        let { password, newPassword } = req.body;
        if (role === EMPLOYEE_ROLE) {
            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                return next(new ApiError(400, "Employee not found"));
            }
            const comparePass = compareHash(password, employee.password);
            if (comparePass === true) {
                newPassword = hashPassword(newPassword);
                await EmployeeModel.findByIdAndUpdate({ _id: id }, { $set: { password: newPassword } }, { new: true });
                res.status(200).json({ statusCode: 200, success: true, message: "Your password change successfully" });
            }
            else {
                next(new ApiError(400, "Password is wrong"));
            }
        }
        else if (role === COMPANY_ROLE) {
            const company = await CompanyModel.findById(id)

            if (!company) {
                return next(new ApiError(400, "Company is not found"));
            }

            const comparePass = compareHash(password, company.password);
            if (comparePass === true) {
                newPassword = hashPassword(newPassword);
                await CompanyModel.findByIdAndUpdate({ _id: id }, { $set: { password: newPassword } }, { new: true })
                res.status(200).json({ statusCode: 200, success: true, message: "Your password change successfully" })
            }
            else {
                next(new ApiError(400, "Password is wrong"));
            }
        }
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}


module.exports = { verifyEmail, verifyOtp, createCompany, updateCompany, deleteCompany, viewCompanyOrProfile, addEmployee, deleteEmployee, getEmployee, changePassword };