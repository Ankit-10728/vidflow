import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const like = (targetType) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;

        if (!id) throw new ApiError(400, "Field incomplete : like")

        const existing = await Like.findOne({
            targetId: new mongoose.Types.ObjectId(id),
            targetType,
            likedBy: new mongoose.Types.ObjectId(userId)
        });

        if (existing) {
            return res.json({ message: "Already liked" });
        }

        const like = await Like.create({
            targetId: new mongoose.Types.ObjectId(id),
            targetType,
            likedBy: new mongoose.Types.ObjectId(userId)
        });


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
            targetId: new mongoose.Types.ObjectId(id),
            targetType,
            likedBy: new mongoose.Types.ObjectId(userId)
        });

        if (!deleted) {
            throw new ApiError(404, "Like not found");
        }

        return res.status(200).json(
            new ApiResponse(200, deleted, "Unliked successfully")
        );
    });

const getLikedItems = (targetType) => asyncHandler(async (req, res) => {
    const { id } = req?.params;

    // const likedItems = await Like.find({
    //     targetId: new mongoose.Types.ObjectId(id),
    //     targetType
    // })


    return res.status(200).json(
        new ApiResponse(200, "likedItems", `Liked ${targetType}s fetched successfully`)
    );
});

const checkLike = (targetType) => asyncHandler(async (req, res) => {
    const { id } = req.params;

    const isLiked = await Like.findOne({
        targetId: new mongoose.Types.ObjectId(id),
        targetType,
        likedBy: new mongoose.Types.ObjectId(req?.user?._id)
    });

    return res.status(200).json(
        new ApiResponse(200, isLiked ? true : false, "data fetched successfully")
    );
});


export {
    like,
    unlike,
    getLikedItems,
    checkLike
}