import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


const uploadVideo = asyncHandler(async (req, res) => {

    if (!req.body) throw new ApiError(400, "req body is undefined");
    // to upload video:-
    // use multer to make it available in the req.file
    // first save to our public folder before uplodaing to the cloudinary
    // upload to clodinary
    // create a new video model and save that url in the video instance along with video details
    // after uploading save to database

    const { title, description } = req.body;

    if (
        [title, description].some((field) => (!field || field?.trim() === ""))
    ) {
        throw new ApiError(400, "Fields are missing");
    }
    if (!req.files) throw new ApiError(400, "Files not found")

    const videoLocalPath = req.files?.video?.[0]?.path;
    const thumbnailPath = req.files?.thumbnail?.[0]?.path;
    if (!videoLocalPath || !thumbnailPath) throw new ApiError(400, "Video not found");

    const uploadedVideo = await uploadOnCloudinary(videoLocalPath, "videos");
    if (!uploadedVideo.secure_url) throw new ApiError(404, "video upload failed");

    const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath, "videos");
    if (!uploadedThumbnail.secure_url) throw new ApiError(404, "Thumbnail upload failed");

    const video = await Video.create({
        videoFile: {
            url: uploadedVideo.secure_url,
            public_id: uploadedVideo.public_id
        },
        thumbnail: {
            url: uploadedThumbnail.secure_url,
            public_id: uploadedThumbnail.public_id
        },
        title,
        description,
        duration: uploadedVideo?.duration,
        owner: req?.user?._id,
    })

    if (!video) throw new ApiError(400, "Error uploading the video");

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "video uploded successfully")
        )

})

const deleteVideo = asyncHandler(async (req, res) => {

    // get the video id
    // look for the video from the database using that video id
    // check if the videp owner is the current logged in user 
    // if onwer is different thrw error
    // if owner is same then proceed further
    // delete the video from the cloudinary 
    // delete the video data from the database
    // return delete message

    const { videoId } = req.params
    if (!videoId) throw new ApiError(404, "video id not found")

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Video not found");

    if (video.owner === req.user._id) throw new ApiError(400, "unauthoriased request");
    // console.log(video.videoFile.public_id)
    const public_id = video.videoFile.public_id
    if (!public_id) throw new ApiError(404, "video does not exist");

    const deleteVideo = await deleteFromCloudinary(public_id);
    if (!deleteVideo) throw new ApiError(400, "Error deleting the video");

    const videoDeletedFromDB = await Video.findByIdAndDelete(video._id);
    if (!videoDeletedFromDB) throw new ApiError(400, "Failed to delete video data from the database");

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "video deleted successfully")
        )
})

const getVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId) throw new ApiError(404, "video id not found");
    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(400, "video not found");
    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "video fetched successfully")
        )
})

const getAllVideosOfUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) throw new ApiError(400, "user does not exist")
    const videos = await Video.find({ owner: userId })
    if (!videos) throw new ApiError(404, "videos not found")

    return res
        .status(200)
        .json(
            new ApiResponse(200, videos, "videos fetched successfully")
        )
})

export {
    uploadVideo,
    deleteVideo,
    getVideo,
    getAllVideosOfUser,
}