const { Schema, model } = require("mongoose")

const leaveSchema = new Schema({
    empId: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        required: true
    },
    leaveTitle: {
        type: String,
        required: true
    },
    leaveReason: {
        type: String,
        default: null
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Start date must be after the current date'
        }
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return !this.startDate || value > this.startDate;
            },
            message: 'End date must be after start date'
        }
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "approved", "rejected"]
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    }
})

const LeaveModel = model("leave", leaveSchema)

module.exports = LeaveModel