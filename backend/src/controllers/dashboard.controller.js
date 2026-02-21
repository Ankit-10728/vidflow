import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";

const getChannelStats = asyncHandler(async (req, res) => {
    const { id: channelId } = req.params;
    if (!channelId || channelId.trim() === "") throw new ApiError(400, "channel field is required");

    const channelStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(channelId) } },

        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videos"
            }
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },

        {
            $lookup: {
                from: "playlists",
                localField: "_id",
                foreignField: "owner",
                as: "playlists"
            }
        },

        {
            $addFields: {
                totalVideos: { $size: "$videos" },
                totalSubscriber: { $size: "$subscribers" },
                totalPlaylist: { $size: "$playlists" },
                totalViews: { $sum: "$videos.views" },
                totalLikes: { $sum: "$videos.likes" }
            }
        },

        {
            $project: {
                fullname: 1,
                avatar: 1,
                coverImage: 1,
                totalVideos: 1,
                totalSubscriber: 1,
                totalPlaylist: 1,
                totalViews: 1,
                totalLikes: 1,
                videos: 1,
                playlists: 1
            }
        }
    ]);

    return res.status(200)
        .json(
            new ApiResponse(200, channelStats[0], "channel details fetched successfully")
        )
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const { id: channelId } = req.params;
    if (!channelId || channelId.trim() === "") throw new ApiError(400, "channel field is required");

    const videos = await Video.find({
        owner: channelId
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, videos, "videos fetched successfully")
        )
})

export {
    getChannelStats,
    getChannelVideos
}