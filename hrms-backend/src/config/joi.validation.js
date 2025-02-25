const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const createCompanyValidation = Joi.object().keys({
    logo: Joi.string(),
    email: Joi.string().email().required(),
    password: JoiPassword.string().min(6).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required(),
    name: Joi.string().required(),
    founder: Joi.string().required(),
    startDate: Joi.date().required(),
    minStaff: Joi.number().integer().required(),
    maxStaff: Joi.number().integer().required(),
    workingHour: Joi.number().integer().required(),
    address: Joi.string().required(),
    landmark: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.string().required(),
    workCategory: Joi.string().required(),
    publicId: Joi.string()
})

const employeeValidation = Joi.object().keys({
    company: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profilePic: Joi.string().allow(null),
    publicId: Joi.string().allow(null),
    mobileNo: Joi.number().required(),
    gender: Joi.string().required(),
    department: Joi.string().required(),
    designation: Joi.string().required(),
    isWorking: Joi.boolean().default(true),
    salary: Joi.number().required(),
    doj: Joi.date().required(),
    dob: Joi.date().allow(null),
    dol: Joi.date().allow(null),
    fatherName: Joi.string().allow(null),
    motherName: Joi.string().allow(null),
    address: Joi.string().allow(null),
    city: Joi.string().allow(null),
    state: Joi.string().allow(null),
    country: Joi.string().allow(null),
    pincode: Joi.string().allow(null),
    adharCardNumber: Joi.string().allow(null),
    emergencyPersonName: Joi.string().allow(null),
    emergencyPersonContactNumber: Joi.string().allow(null),
    bankName: Joi.string().allow(null),
    acHolderName: Joi.string().allow(null),
    acNumber: Joi.string().allow(null),
    ifscCode: Joi.string().allow(null),
});

const departmentValidation = Joi.object().keys({
    name: Joi.string().required(),
    companyId: Joi.string().required(),
});

const designationValidation = Joi.object().keys({
    name: Joi.string().required(),
    companyId: Joi.string().required()
})

const tagsValidation = Joi.object().keys({
    name: Joi.string().required(),
    companyId: Joi.string().required()
})

const holidayValidation = Joi.object().keys({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null,''),
    holidayType: Joi.string().required(),
    description: Joi.string().allow('',null),
    companyId: Joi.string().required()
});

const leaveValidation = Joi.object().keys({
    empId: Joi.string().required(),
    leaveTitle: Joi.string().required(),
    leaveReason: Joi.string().allow(null),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected').default('pending')
});

const noticeValidation = Joi.object().keys({
    companyId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    date: Joi.date().default(Date.now())
});

const projectValidation = Joi.object().keys({
    projectTitle: Joi.string().required(),
    description: Joi.string().required(),
    clientName: Joi.string().required(),
    status: Joi.string().valid("upcoming", "complete", "running").default("upcoming"),
    returnDate: Joi.date().allow(null),
    companyId: Joi.string().required(),
});

module.exports = {
    createCompanyValidation,
    employeeValidation,
    departmentValidation,
    designationValidation,
    tagsValidation,
    holidayValidation,
    leaveValidation,
    noticeValidation,
    projectValidation
}