const { Schema, model } = require("mongoose");

const workCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
    }
);


const WorkCategoryModel = model("work-categories", workCategorySchema);

module.exports = WorkCategoryModel;