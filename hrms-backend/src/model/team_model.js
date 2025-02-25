    const { Schema, model } = require("mongoose")

    const teamSchema = new Schema({
        companyId: {
            type: Schema.Types.ObjectId,
            ref: "companies",
            required: true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "project",
            required: true
        },
        leaderId: {
            type: Schema.Types.ObjectId,
            ref: "employees",
            required: true
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: "employees",
            required: true
        }],
        isWorking: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
        }
    })

    const TeamModel = model("team", teamSchema)

    module.exports = TeamModel