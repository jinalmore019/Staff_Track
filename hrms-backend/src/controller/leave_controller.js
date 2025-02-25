const ApiError = require("../utils/error");
const LeaveModel = require("../model/leave_model");
const { COMPANY_ROLE } = require("../config/string");
const EmployeeModel = require("../model/employee_model");
const { leaveValidation } = require("../config/joi.validation");
const { formateDate } = require("../utils/date");

async function addLeave(req, res, next) {
    try {
        req.body.empId = req.id;
        const leaveValid = leaveValidation.validate(req.body)
        if (leaveValid.error) {
            return next(new ApiError(403, leaveValid.error.details[0].message))
        }
        let { startDate, endDate } = req.body;

        if (!endDate) {
            startDate = formateDate(startDate);
            endDate = moment(startDate).add(1, 'day');
        } else {
            startDate = formateDate(startDate);
            endDate = formateDate(endDate);
        }
        const leave = new LeaveModel({ ...req.body, startDate, endDate });
        await leave.save();
        res.status(201).json({ statusCode: 201, success: true, data: leave, message: "leave added successfully" });
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function getLeave(req, res, next) {
    try {
        if (req.role === COMPANY_ROLE) {
            const employees = await EmployeeModel.find({ company: req.id })
            const employeeId = employees.map((e) => e._id);
            const leaves = await LeaveModel.find({ empId: { $in: employeeId } }).populate("empId").sort({ createdAt: -1 });
            res.status(200).json({ statusCode: 200, success: true, data: leaves });
        }
        else {
            const leaves = await LeaveModel.find({ empId: req.id }).sort({ createdAt: -1 });
            res.status(200).json({ statusCode: 200, success: true, data: leaves });
        }
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function updateLeave(req, res, next) {
    try {
        const leave = await LeaveModel.findOneAndUpdate({ _id: req.params.id, status: 'pending' }, { $set: req.body }, { new: true, runValidators: true });
        if (leave) {
            return res.status(200).json({ statusCode: 200, success: true, data: leave, message: "leave updated successfully" });
        }
        return next(new ApiError(403, "You only edit leave when your leave status is pending"));
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

//only delete leave when leave start date is greater than today's date and status is pending
async function deleteLeave(req, res, next) {
    try {
        const leaveId = req.params.id;
        const checkStatus = await LeaveModel.findOne({ _id: leaveId, startDate: { $gte: new Date() } });
        if (checkStatus?.status === "pending") {
            await LeaveModel.findByIdAndDelete(leaveId);
            return res.status(200).json({ statusCode: 200, success: true, message: "leave delete successfully" });
        }
        else {
            return next(new ApiError(403, "you are not able to delete leave"));
        }
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

module.exports = { addLeave, getLeave, updateLeave, deleteLeave };