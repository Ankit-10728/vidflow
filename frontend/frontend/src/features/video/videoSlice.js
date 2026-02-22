import { createSlice } from "@reduxjs/toolkit";
import {
    uploadVideo,
    getVideoById,
    getAllVideosOfUser,
    deleteVideo,
} from "./videoApi";

const initialState = {
    videos: {
        myVideos: [],
        userVideos: [],
        currentVideo: null,
    },

    loading: {
        upload: false,
        fetchOne: false,
        fetchUserVideos: false,
        delete: false,
    },

    error: {
        upload: null,
        fetchOne: null,
        delete: null,
        userVideos: null
    },
};

const uploadThunks = [uploadVideo];
const fetchOneThunks = [getVideoById];
const fetchUserVideosThunks = [getAllVideosOfUser];
const deleteThunks = [deleteVideo];

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
                }
            })

            .addCase(getVideoById.fulfilled, (state, action) => {
                state.loading.fetchOne = false;
                state.videos.currentVideo = action.payload?.data || action.payload;
            })

            .addCase(getAllVideosOfUser.fulfilled, (state, action) => {
                state.loading.fetchUserVideos = false;
                state.videos.userVideos = action.payload?.data || action.payload;
            })

            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.loading.delete = false;

                const id = action.payload.videoId;
                state.videos.myVideos = state.videos.myVideos.filter((video) => video._id !== id);

                // if currently opened video is deleted
                if (state.videos.currentVideo?._id === id) {
                    state.videos.currentVideo = null;
                }
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
            });
    },
});

export const { clearCurrentVideo } = videoSlice.actions;

export default videoSlice.reducer;