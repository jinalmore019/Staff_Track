const { Schema, model } = require("mongoose")

const projectSchema = new Schema({
    projectTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "upcoming",
        enum: ['upcoming', 'complete', 'running']
    },
    returnDate: {
        type: Date,
        default: null
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true
    },

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
});

const ProjectModel = model("project", projectSchema);

module.exports = ProjectModel