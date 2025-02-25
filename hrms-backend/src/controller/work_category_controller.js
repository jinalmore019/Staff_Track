const ApiError = require("../utils/error")
const WorkCategoryModel = require("../model/work_category_model")

async function addWorkCategory(req, res, next) {
    try {
        const workCategory = new WorkCategoryModel(req.body);
        await workCategory.save();
        res.status(201).json({ statusCode: 201, success: true, data: workCategory, message: "work category added successfully" });
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function getWorkCategory(_req, res, next) {
    try {
        const workCategories = await WorkCategoryModel.find({});
        res.status(200).json({ statusCode: 200, success: true, data: workCategories });
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function updateWorkCategory(req, res, next) {
    try {
        const workCategory = await WorkCategoryModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, data: workCategory, message: "work category update successfully" });
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function deleteWorkCategory(req, res, next) {
    try {
        await WorkCategoryModel.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ statusCode: 200, success: true, message: "work category delete successfully" });
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

module.exports = { addWorkCategory, getWorkCategory, updateWorkCategory, deleteWorkCategory };