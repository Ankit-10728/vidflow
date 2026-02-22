import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const subscribe = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { userId: channelId } = req.params;
    if (channelId.equals(userId)) throw new ApiError(400, "Cannot subscribe to own channel");
    if (!channelId || channelId.trim() === "") throw new ApiError(404, "Channel id field is required");

    const subscribed = await Subscription.create(
        {
            channel: channelId,
            subscriber: userId
        }
    )

    if (!subscribed) throw new ApiError(400, "something went wrong");
    return res
        .status(200)
        .json(
            new ApiResponse(200, subscribed, "Subscibed successfully")
        )
})


const unsubscribe = asyncHandler(async (req, res) => {
    const { userId: channelId } = req.params;
    const userId = req.user._id;

    if (!channelId || channelId.trim() === "") throw new ApiError(404, "Channel id field is required");

    const unsubscribe = await Subscription.findOneAndDelete({
        channel: channelId,
        subscriber: userId
    })

    if (!unsubscribe) throw new ApiError(400, "not subscribed to channel");
    return res
        .status(200)
        .json(
            new ApiResponse(200, unsubscribe, "unsubscribed successfully")
        )
})


const getAllSubscriber = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const allSubs = await Subscription
        .find({
            channel: userId
        })
        .populate("channel", "fullname avatar userId")

    if (!allSubs) throw new ApiError(400, "Channel does not exist");

    return res
        .status(200)
        .json(
            new ApiResponse(200, allSubs, "Subscriber fetched succesfully")
        )
})

const getAllSubscribedChannel = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const channel = await Subscription.find({
        subscriber: userId
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, channel, "Subscribed channel fetched succesfully")
        )
})


export {
    subscribe,
    unsubscribe,
    getAllSubscriber,
    getAllSubscribedChannel
}