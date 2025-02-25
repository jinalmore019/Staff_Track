const { Schema, model } = require("mongoose");
const { hashPassword } = require("../utils/hash");
const EmployeeModel = require("./employee_model");
const cloudinary = require("../utils/cloudinary");
const DesignationModel = require("./designation_model");
const DepartmentModel = require("./department_model");
const HolidayModel = require("./holiday_model");

const companySchema = new Schema({
    logo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    founder: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    minStaff: {
        type: Number,
        required: true,
    },
    maxStaff: {
        type: Number,
        required: true,
    },
    workingHour: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    workCategory: {
            type: Schema.Types.ObjectId,
            ref: "work-categories",
            require:true
    },
    publicId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_doc, ret, _option) => {
            delete ret.password;
        },
        virtuals: true,
        versionKey: false,
    },
});

companySchema.pre("save", function (next) {
    if (this.isModified(["password"])) {
        this.password = hashPassword(this.password);
    }
    next();
});


const CompanyModel = model("companies", companySchema);

module.exports = CompanyModel;