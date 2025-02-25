const ApiError = require("../utils/error")
const HolidayModel = require("../model/holiday_model")
const { EMPLOYEE_ROLE } = require("../config/string")
const { holidayValidation } = require("../config/joi.validation")
const moment = require("moment")
const { formateDate } = require("../utils/date")

async function addHoliday(req, res, next) {
    try {
        req.body.companyId = req.id

        const holiValidation = holidayValidation.validate(req.body)
        if (holiValidation.error) {
            return next(new ApiError(403, holiValidation.error.details[0].message))
        }
        let { startDate, endDate } = req.body;

        if (!endDate) {
            startDate = formateDate(startDate);
            endDate = moment(startDate).add(1, 'day');
        } else {
            startDate = formateDate(startDate);
            endDate = formateDate(endDate);
        }
        const holiday = new HolidayModel({ ...req.body, startDate, endDate })
        await holiday.save()
        res.status(201).json({ statusCode: 201, success: true, data: holiday, message: "holiday added sucessfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function getHoliday(req, res, next) {

    try {
        let companyId = req.id;
        if (req.role === EMPLOYEE_ROLE) {
            companyId = req.user.company;
        }
        const holidays = await HolidayModel.find({ companyId }).sort({ startDate: -1 });
        res.status(200).json({ statusCode: 200, success: true, data: holidays });
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function updateHoliday(req, res, next) {
    try {
        const holiday = await HolidayModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).json({ statusCode: 200, success: true, data: holiday, message: "holiday update sucessfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function deleteHoliday(req, res, next) {
    try {
        await HolidayModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ statusCode: 200, success: true, message: "holiday delete sucessfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

module.exports = { addHoliday, getHoliday, updateHoliday, deleteHoliday }