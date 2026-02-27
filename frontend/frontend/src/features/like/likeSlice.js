import {
    getLikedVideos,
    getLikedTweets
} from "./likeApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedVideos: [],
    likedTweets: [],
    loading: false,
    error: null
};

const thunks = [getLikedTweets, getLikedVideos];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);


const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getLikedVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.likedVideos = action.payload?.data
            })

            .addCase(getLikedTweets.fulfilled, (state) => {
                state.loading = false;
                state.likedTweets = action.payload?.data
            })

            .addMatcher(isPending(thunks), (state) => {
                state.loading = true;
                state.error = null;
            })

            .addMatcher(isRejected(thunks), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default likeSlice.reducer;