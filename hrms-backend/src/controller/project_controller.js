const ApiError = require("../utils/error")
const ProjectModel = require("../model/project_model")
const { projectValidation } = require("../config/joi.validation");
const EmployeeModel = require("../model/employee_model");
const { EMPLOYEE_ROLE } = require("../config/string");

async function addProject(req, res, next) {
    try {
        req.body.companyId = req.id;
        const proValid = projectValidation.validate(req.body)
        if (proValid.error) {
            return next(new ApiError(403, proValid.error.details[0].message))
        }
        const project = new ProjectModel(req.body);
        await project.save();
        res.status(201).json({ statusCode: 201, success: true, message: "project details added successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function getProject(req, res, next) {
    try {

        let companyId = req.id;
        if (req.role === EMPLOYEE_ROLE) {
            companyId = await EmployeeModel.getCompanyId(req.id);
        }
        const projects = await ProjectModel.find({ companyId,isWorking:true }).sort({ createdAt: -1 });
        res.status(200).json({ statusCode: 200, success: true, data: projects });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function updateProject(req, res, next) {
    try {
        await ProjectModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, message: "project details update successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function deleteProject(req, res, next) {
    try {
        await ProjectModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { isWorking: false, status: "complete" } }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, message: "project delete sucessfully" });
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}

module.exports = { addProject, getProject, updateProject, deleteProject };