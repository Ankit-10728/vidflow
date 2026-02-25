import { createSlice } from "@reduxjs/toolkit";
import {
    createTweetComment,
    createVideoComment,
    getTweetComments,
    getVideoComments,
    updateTweetComment,
    updateVideoComment,
    deleteTweetComment,
    deleteVideoComment,
} from "./commentApi.js";

const initialState = {
    comments: {
        tweetComments: [],
        videoComments: []
    },
    loading: {
        createComment: false,
        updateComment: false,
        getComment: false,
        deleteComment: false,
    },
    error: {
        createComment: null,
        updateComment: null,
        getComment: null,
        deleteComment: null,
    },
};

const createThunks = [createTweetComment, createVideoComment];
const updateThunks = [updateTweetComment, updateVideoComment];
const fetchThunks = [getTweetComments, getVideoComments];
const deleteThunks = [deleteTweetComment, deleteVideoComment];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getTweetComments.fulfilled, (state, action) => {
                state.loading.getComment = false;
                state.comments.tweetComments = action.payload?.data;
            })

            .addCase(getVideoComments.fulfilled, (state, action) => {
                state.loading.getComment = false;
                state.comments.videoComments = action.payload?.data;
            })

            .addCase(createTweetComment.fulfilled, (state, action) => {
                state.loading.createComment = false;
                state.comments.tweetComments.unshift(action.payload?.data);
            })

            .addCase(createVideoComment.fulfilled, (state, action) => {
                state.loading.createComment = false;
                state.comments.videoComments.unshift(action.payload?.data);
            })

            .addCase(updateTweetComment.fulfilled, (state, action) => {
                state.loading.updateComment = false;
                const updated = action.payload?.data;

                const index = state.comments.tweetComments.findIndex(
                    (c) => c._id === updated._id
                );
                if (index !== -1) {
                    state.comments.tweetComments[index] = updated;
                }
            })

            .addCase(updateVideoComment.fulfilled, (state, action) => {
                state.loading.updateComment = false;
                const updated = action.payload?.data;

                const index = state.comments.videoComments.findIndex(
                    (c) => c._id === updated._id
                );
                if (index !== -1) {
                    state.comments.videoComments[index] = updated;
                }
            })

            .addCase(deleteTweetComment.fulfilled, (state, action) => {
                state.loading.deleteComment = false;
                const id = action.meta.arg;

                state.comments.tweetComments = state.comments.tweetComments.filter(
                    (c) => c._id !== id
                );
            })

            .addCase(deleteVideoComment.fulfilled, (state, action) => {
                state.loading.deleteComment = false;
                const id = action.meta.arg;

                state.comments.videoComments = state.comments.videoComments.filter(
                    (c) => c._id !== id
                );
            })

            .addMatcher(isPending(createThunks), (state) => {
                state.loading.createComment = true;
                state.error.createComment = null;
            })

            .addMatcher(isPending(updateThunks), (state) => {
                state.loading.updateComment = true;
                state.error.updateComment = null;
            })

            .addMatcher(isPending(fetchThunks), (state) => {
                state.loading.getComment = true;
                state.error.getComment = null;
            })

            .addMatcher(isPending(deleteThunks), (state) => {
                state.loading.deleteComment = true;
                state.error.deleteComment = null;
            })

            .addMatcher(isRejected(createThunks), (state, action) => {
                state.loading.createComment = false;
                state.error.createComment = action.payload;
            })

            .addMatcher(isRejected(updateThunks), (state, action) => {
                state.loading.updateComment = false;
                state.error.updateComment = action.payload;
            })

            .addMatcher(isRejected(fetchThunks), (state, action) => {
                state.loading.getComment = false;
                state.error.getComment = action.payload;
            })

            .addMatcher(isRejected(deleteThunks), (state, action) => {
                state.loading.deleteComment = false;
                state.error.deleteComment = action.payload;
            });
    },
});

export default commentSlice.reducer;