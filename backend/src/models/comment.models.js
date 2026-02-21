import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "targetType"
    },
    targetType: {
        type: String,
        required: true,
        enum: ["Video", "Tweet"]
    },
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

commentSchema.index(
    { targetId: 1, targetType: 1, owner: 1 },
    { unique: true }
);

export const Comment = mongoose.model("Comment", commentSchema);