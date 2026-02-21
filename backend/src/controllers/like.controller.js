import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const like = (targetType) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;

        if (!id) throw new ApiError(400, "Field incomplete : like")

        const like = await Like.findOneAndUpdate(
            await Like.findOneAndUpdate(
                { targetId: id, targetType, likedBy: userId },
                {
                    $setOnInsert: {
                        targetId: id,
                        targetType,
                        likedBy: userId
                    }
                },
                {
                    upsert: true,
                    new: true
                }
            ))


        return res.status(200).json(
            new ApiResponse(200, like, "Liked successfully")
        );
    });

const unlike = (targetType) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;
        if (!id) throw new ApiError(400, "Field incomplete : unlike")

        const deleted = await Like.findOneAndDelete({
            targetId: id,
            targetType,
            likedBy: userId
        });

        if (!deleted) {
            throw new ApiError(404, "Like not found");
        }

        return res.status(200).json(
            new ApiResponse(200, deleted, "Unliked successfully")
        );
    });

const getLikedItems = (targetType) => asyncHandler(async (req, res) => {
    const ownerId = req.user._id;

    const likedItems = await Like.find({
        likedBy: ownerId,
        targetType
    })
        .populate("targetId", "title content thumbnail owner")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, likedItems, `Liked ${targetType}s fetched successfully`)
    );
});

export {
    like,
    unlike,
    getLikedItems
}