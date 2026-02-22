import { Comment } from "../models/comment.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const createComment = (targetType) => asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { id } = req.params
    if (!id) throw new ApiError(400, "Id not found : comment")

    const commentCheck = await Comment.findOne({
        targetId: id,
        targetType,
        owner: userId
    })

    if (!commentCheck) throw new ApiError(400, "Comment allready exist")

    const { content } = req.body
    if (!content) throw new ApiError(400, "Comment content not found")

    const comment = await Comment.findOneAndUpdate(
        { targetId, targetType, owner: userId },
        { $set: { content } },
        { upsert: true, new: true }
    );

    if (!comment) throw new ApiError(400, "comment not found")

    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "commented successfully")
        )
})

const getComments = (targetType) => asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) throw new ApiError(400, "field is required to get comments");

    const comments = await Comment.find({
        targetId: id,
        targetType
    }).populate("owner", "username avatar")

    return res
        .status(200)
        .json(
            new ApiResponse(200, comments, "comments fetched successfully")
        )
})

const deleteComment = (targetType) => asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { id } = req.params

    const deleted = Comment.findOneAndDelete({
        targetId: id,
        targetType,
        owner: userId
    })

    if (!deleted) {
        throw new ApiError(404, "comment not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, id, "comment deleted successfully")
        )
})

const updateComment = (targetType) => asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id

    if (!id) throw new ApiError(400, "comment not found");

    const { content } = req.body;
    if (!content || content.trim() === "") throw new ApiError(404, "comment cannot be empty");

    const comment = await Comment.findOneAndUpdate({
        targetId: id,
        targetType,
        owner: userId
    },
        { $set: { content: content } },
        { new: true })

    if (!comment) throw new ApiError(400, "error updating the comment");
    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "comment updated successfully")
        )

})


export {
    createComment,
    deleteComment,
    updateComment,
    getComments
}