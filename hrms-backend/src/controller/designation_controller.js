const ApiError = require("../utils/error")
const DesignationModel = require("../model/designation_model")
const { designationValidation } = require("../config/joi.validation")

async function addDesignation(req, res, next) {
    try {
        debugger
        req.body.companyId = req.id

        const desigValidation = designationValidation.validate(req.body)
        if (desigValidation.error) {
            return next(new ApiError(403, desigValidation.error.details[0].message))
        }

        const designation = new DesignationModel(req.body)
        await designation.save()
        res.status(201).json({ statusCode: 201, success: true, data: designation, message: "Designation added successfully" })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function getDesignation(req, res, next) {
    try {
        const designations = await DesignationModel.find({ companyId: req.id }).sort({ createdAt: -1 });
        res.status(200).json({ statusCode: 200, success: true, data: designations })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function updateDesignation(req, res, next) {
    try {
        const designation = await DesignationModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } }, { new: true })
        res.status(200).json({ statusCode: 200, success: true, data: designation, message: "update designation succesfully" })
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

async function deleteDesignation(req, res, next) {
    try {
        await DesignationModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ statusCode: 200, success: true, message: "Designation delete successfully" });
    } catch (error) {
        next(new ApiError(400, error.message))
    }
}

module.exports = { addDesignation, getDesignation, updateDesignation, deleteDesignation }