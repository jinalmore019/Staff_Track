const ApiError = require("../utils/error")
const ToggleLogModel = require("../model/toggle_log_model")
const EmployeeModel = require("../model/employee_model")
const { COMPANY_ROLE } = require("../config/string");
const ProjectModel = require("../model/project_model");

async function addToggleLog(req, res, next) {
    try {
        req.body.empId = req.id
        const toggle = new ToggleLogModel(req.body)
        await toggle.save()
        res.status(201).json({ statusCode: 201, success: true, data: toggle, message: "toggle log added successfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function getToggleLog(req, res, next) {
    try {

        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        const filter = {};
        if (startDate && endDate) {
            filter.date = {
                $gte: startDate,
                $lte: endDate,
            };
        } else if (startDate) {
            filter.date = { $gte: startDate };
        } else if (endDate) {
            filter.date = { $lte: endDate };
        }

        if (req.role === COMPANY_ROLE) {
            const employees = await EmployeeModel.find({ company: req.id });
            const employeeId = employees.map((e) => e._id);
            const toggle = await ToggleLogModel.find({ empId: { $in: employeeId } }).populate("project").populate("tags").sort({ createdAt: -1 });
            res.status(200).json({ success: true, data: toggle });
        }
        else {
            const toggles = await ToggleLogModel.find({ empId: req.id }).populate("project").populate("tags").sort({ createdAt: -1 });
            res.status(200).json({ success: true, data: toggles })
        }
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function updateToggleLog(req, res, next) {
    try {
        const toggle = await ToggleLogModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json({ statusCode: 200, success: true, data: toggle, message: "toggle updated successfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function deleteToggleLog(req, res, next) {
    try {
        const toggle = await ToggleLogModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ statusCode: 200, success: true, message: "toggle deleted successfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

module.exports = { addToggleLog, getToggleLog, updateToggleLog, deleteToggleLog }