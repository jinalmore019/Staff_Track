const ApiError = require("../utils/error")
const EmployeeModel = require("../model/employee_model")
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

//emplooye
async function editProfile(req, res, next) {
    try {
        const { file }= req;
        if(file) {
            const result = await cloudinary.uploader.upload(file.path);
            req.body.profilePic = result.secure_url;
            req.body.publicId = result.public_id;
            fs.unlinkSync(file.path);
        }
        const id = req.id;
        const profile = await EmployeeModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true }).populate([{
            path: 'department'
        }, {
            path: 'designation'
        }, {
            path: "company",
            select: {
                email: 1,
                logo: 1,
                name: 1,
                _id: 1,
            }
        }]);
        res.status(200).json({ statusCode: 200, success: true, data: profile, message: "profile details update successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

//company
async function addOrUpdateProfile(req, res, next) {
    try {
        const path = req?.file?.path;
        if (path) {
            const result = await cloudinary.uploader.upload(path);
            req.body.profilePic = result.secure_url;
            req.body.publicId = result.public_id;
            fs.unlinkSync(path);
        }
        const id = req.params.id;
        const profile = await EmployeeModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, data: profile, message: "employee Updated successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

module.exports = { editProfile, addOrUpdateProfile };