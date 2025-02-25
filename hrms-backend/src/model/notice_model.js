const { Schema, model, SchemaType } = require("mongoose")

const noticeSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    }
})

const NoticeModel = model("notice", noticeSchema)

module.exports = NoticeModel