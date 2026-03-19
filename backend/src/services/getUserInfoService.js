import { User } from "../models/user.models.js";
import mongoose from "mongoose";
const getUserChannelProfileService = async (userId) => {
    const channel = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscriber",
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            }
        },
        {
            $addFields: {
                subscriberCount: { $size: "$subscriber" },
                channelsSubscribedTo: { $size: "$subscribedTo" },
                isSubscribed: {
                    $cond: {
                        if: { $in: [userId, "$subscriber.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                username: 1,
                isSubscribed: 1,
                subscriberCount: 1,
                fullname: 1,
                channelsSubscribedTo: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
            }
        }
    ]);

    return channel[0];
};

export default getUserChannelProfileService