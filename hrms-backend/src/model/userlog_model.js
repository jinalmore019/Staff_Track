const { Schema, model } = require("mongoose")

const userlogSchema = new Schema({
    empId: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isLogout: {
        type: Boolean,
        default: false,
    },
    timeBlock: [{
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            default: null,
        }
    }],
    totalBreakTime:{
        type:Number,
        default: null,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    }
})

const UserlogModel = model("userlog", userlogSchema)

module.exports = UserlogModel