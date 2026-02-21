import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTweet = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "request body is undefined")
    const { content } = req.body;
    if (!content || content.trim() === "") throw new ApiError(400, "content is required");
    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    })

    if (!tweet) throw new ApiError(400, "Error creating tweet");

    return res
        .status(200)
        .json(
            new ApiResponse(200, tweet, "tweet created successfully")
        )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) throw new ApiError(400, "Select a tweet to delete");
    const tweet = await Tweet.findById(tweetId);
    if (!tweet.owner.equals(req.user._id)) throw new ApiError(400, "unauthorised request");

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
    if (!deletedTweet) throw new ApiError(400, "error deleting the tweet");

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Tweet deleted successfully")
        )
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) throw new ApiError(400, "Tweet does not exist");

    const tweet = await Tweet.findById(tweetId);
    if (!tweet.owner.equals(req.user._id)) throw new ApiError(400, "unauthorised request");

    const { content } = req.body

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweet._id,
        {
            $set: { content: content }
        },
        { new: true }
    )
    if (!updatedTweet) throw new ApiError(400, "failed to update tweet");

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTweet, "Tweet updated successfully")
        )
})

const getUserTweets = asyncHandler(async (req, res) => {

    const { userId } = req.params
    if (!userId) throw new ApiError(400, "error user field required");

    const tweets = await Tweet.find({
        owner: userId
    })

    if (!tweets) throw new ApiError(400, "tweets does not exist");

    return res
        .status(200)
        .json(
            new ApiResponse(200, tweets, "tweets fetched successfully")
        )
})

export {
    createTweet,
    deleteTweet,
    updateTweet,
    getUserTweets
}