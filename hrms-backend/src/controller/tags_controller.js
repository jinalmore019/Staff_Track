const ApiError = require("../utils/error")
const TagsModel = require("../model/tags_model")
const {tagsValidation}=require("../config/joi.validation");
const { EMPLOYEE_ROLE } = require("../config/string");
const EmployeeModel = require("../model/employee_model");

async function addTags(req, res, next) {
    try {
        debugger
        req.body.companyId = req.id;

        const tagsValid = tagsValidation.validate(req.body)
        if (tagsValid.error) {
            return next(new ApiError(403, tagsValid.error.details[0].message))
        }

        const tags = new TagsModel(req.body)
        await tags.save()
        res.status(201).json({ statusCode: 200, success: true, data: tags, message: "tag added successfully" })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function getTags(req, res, next) {
    try {
        let companyId = req.id;
        if (req.role === EMPLOYEE_ROLE) {
            companyId = await EmployeeModel.getCompanyId(req.id);
        }
        const tags = await TagsModel.find({ companyId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tags })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function deleteTags(req, res, next) {
    try {
        await TagsModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ statusCode: 200, success: true, message: "tags delete successfully" });
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

module.exports = { addTags, getTags, deleteTags }