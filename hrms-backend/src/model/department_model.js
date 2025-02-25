const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});

const DepartmentModel = model("department", departmentSchema);

module.exports = DepartmentModel;