import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playlist.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    if (!name) throw new ApiError(400, "name of the playlist is required")

    const exists = await Playlist.findOne({ name, owner: req.user._id });
    if (exists) throw new ApiError(400, "Playlist already exists");


    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })
    if (!playlist) throw new ApiError(400, "Playlist not found")

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "playlist cretaed successfully")
        )
})

const addToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const playlist = await Playlist.findOne({
        _id: playlistId,
        owner: req.user._id
    });
    if (!playlist) {
        throw new ApiError(400, "playlist does not exist :: addToPlaylist")
    }

    const { videoId } = req.params

    if (!videoId) throw new ApiError(400, "Video id is required");

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlist._id,
        {
            $addToSet: { videos: videoId }
        },
        {
            new: true
        }
    )

    if (!updatedPlaylist) throw new ApiError(400, "Playlist not found")
    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedPlaylist, "video added successfully")
        )
})

const removeFromPlaylist = asyncHandler(async (req, res) => {
    const { videoId, playlistId } = req.params

    if (!videoId || !playlistId) throw new ApiError(400, "video or playlist does not exist");

    const updatedPlaylist = await Playlist.findOneAndUpdate(
        { _id: playlistId, owner: req.user._id },
        { $pull: { videos: videoId } },
        { new: true }
    );

    if (!updatedPlaylist) throw new ApiError(400, "Plalist does not exist");

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedPlaylist, "video removed from the playlist successfully")
        )

})


const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const deletedPlaylist = await Playlist.findOneAndDelete({
        _id: playlistId,
        owner: req.user._id
    });
    if (!deletedPlaylist) throw new ApiError(400, "Playlist doesnot exist")
    return res
        .status(200)
        .json(
            new ApiResponse(200, playlistId, "Playlist deleted successfully")
        )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) throw new ApiError(400, "missing user filed :: get user playlist");

    const playlists = await Playlist
        .find({
            owner: userId
        })
        .populate("videos")
        .populate("owner", "username avatar fullname")

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlists, "playlists fetched successfully")
        )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!playlistId) throw new ApiError(400, "missing user filed : get user playlist by id");

    const playlist = await Playlist
        .findById(playlistId)
        .populate("videos")
    if (!playlist) throw new ApiError(400, "Playlist not found")

    return res.status(200)
        .json(
            new ApiResponse(200, playlist, "playlist fethed successfully")
        )
})

export {
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    getUserPlaylists,
    getPlaylistById
}