const ApiError = require("../utils/error")
const DepartmentModel = require("../model/department_model")
const { departmentValidation } = require("../config/joi.validation")

async function addDepartment(req, res, next) {
  try {
    req.body.companyId = req.id;

        const departValidation = departmentValidation.validate(req.body)
        if (departValidation.error) {
            return next(new ApiError(403, departValidation.error.details[0].message))
        }

        const department = new DepartmentModel(req.body)
        await department.save()
        res.status(201).json({ statusCode: 201, success: true, data: department, message: "department added successfully" })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function getDepartment(req, res, next) {
    try {
        const departments = await DepartmentModel.find({ companyId: req.id }).sort({ createdAt: -1 });
        res.status(200).json({ statusCode: 200, success: true, data: departments })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function updateDepartment(req, res, next) {
    try {
        const department = await DepartmentModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } }, { new: true })
        res.status(200).json({ statusCode: 200, success: true, data: department, message: "update department succesfully" })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function deleteDepartment(req, res, next) {
    try {
        await DepartmentModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ statusCode: 200, success: true, message: "department delete successfully" });
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

module.exports = {
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
