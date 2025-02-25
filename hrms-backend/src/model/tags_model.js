const { Schema, model } = require("mongoose");

const tagsSchema = new Schema({
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
        transform: (_doc, ret, _option) => {
            delete ret._id;
        },
        virtuals: true,
        versionKey: false,
    },
});

const TagsModel = model("tags", tagsSchema);

module.exports = TagsModel;