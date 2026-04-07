import { createSlice } from "@reduxjs/toolkit";
import {
    uploadVideo,
    getVideoById,
    getAllVideosOfUser,
    deleteVideo,
    getExploreVideos,

} from "./videoApi.js";
import { toast } from "react-toastify";

const initialState = {
    videos: {
        exploreVideos: [],
        myVideos: [],
        userVideos: [],
        currentVideo: null,

    },

    loading: {
        upload: false,
        fetchOne: false,
        fetchUserVideos: false,
        delete: false,
        explore: false,

    },

    error: {
        upload: null,
        fetchOne: null,
        delete: null,
        userVideos: null,
        explore: null,
    },

    pagination: {
        explorePage: 1,
        hasMore: true,
    }
};

const uploadThunks = [uploadVideo];
const fetchOneThunks = [getVideoById];
const fetchUserVideosThunks = [getAllVideosOfUser];
const deleteThunks = [deleteVideo];
const exploreThunks = [getExploreVideos];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        clearCurrentVideo: (state) => {
            state.currentVideo = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.loading.upload = false;

                if (action.payload?.data) {
                    state.videos.myVideos.unshift(action.payload.data);
                    state.videos.currentVideo = action.payload?.data || action.payload;
                    toast.success("Video Uploaded 🎥");
                }
            })

            .addCase(getExploreVideos.fulfilled, (state, action) => {
                state.loading.explore = false;

                const { videos = [], hasMore = true } = action.payload || {};

                const map = new Map();

                (state.videos.exploreVideos || []).forEach(v => {
                    map.set(v._id, v);
                });

                videos.forEach(v => {
                    map.set(v._id, v);
                });

                state.videos.exploreVideos = Array.from(map.values());
                state.pagination.hasMore = hasMore;

                toast.success("Videos fetched Successfully 🌚");
            })


            .addCase(getVideoById.fulfilled, (state, action) => {
                state.loading.fetchOne = false;

                state.videos.currentVideo = action.payload?.data;
            })

            .addCase(getAllVideosOfUser.fulfilled, (state, action) => {
                state.loading.fetchUserVideos = false;
                state.videos.userVideos = action.payload?.data || action.payload;
            })

            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.loading.delete = false;

                const id = action.payload.videoId;
                state.videos.myVideos = state.videos.myVideos.filter((video) => video._id !== id);
                if (state.videos.currentVideo?._id === id) {
                    state.videos.currentVideo = null;
                }
                toast.success("Vidoe Deleted 🚮");
            })

            .addMatcher(isPending(uploadThunks), (state) => {
                state.loading.upload = true;
                state.error.upload = null;
            })

            .addMatcher(isPending(fetchOneThunks), (state) => {
                state.loading.fetchOne = true;
                state.error.fetchOne = null;
            })

            .addMatcher(isPending(fetchUserVideosThunks), (state) => {
                state.loading.fetchUserVideos = true;
                state.error.userVideos = null;
            })

            .addMatcher(isPending(deleteThunks), (state) => {
                state.loading.delete = true;
                state.error.delete = null;
            })

            .addMatcher(isRejected(uploadThunks), (state, action) => {
                state.loading.upload = false;
                state.error.upload = action.payload;
            })

            .addMatcher(isRejected(fetchOneThunks), (state, action) => {
                state.loading.fetchOne = false;
                state.error.fetchOne = action.payload;
            })

            .addMatcher(isRejected(fetchUserVideosThunks), (state, action) => {
                state.loading.fetchUserVideos = false;
                state.error.userVideos = action.payload;
            })

            .addMatcher(isRejected(deleteThunks), (state, action) => {
                state.loading.delete = false;
                state.error.delete = action.payload;
            })

            .addMatcher(isPending(exploreThunks), (state) => {
                state.loading.explore = true;
                state.error.explore = null;
            })

            .addMatcher(isRejected(exploreThunks), (state, action) => {
                state.loading.explore = false;
                state.error.explore = action.payload;
            })


    },
});

export const { clearCurrentVideo } = videoSlice.actions;

export default videoSlice.reducer;