import {
    getLikedVideos,
    getLikedTweets,
    checkIsLiked
} from "./likeApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curItemLiked: false,
    likedVideos: [],
    likedTweets: [],
    loading: false,
    error: null
};

const thunks = [getLikedTweets, getLikedVideos, checkIsLiked];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);


const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        setUnlike: (state) => {
            state.curItemLiked = false;
            console.log("inside the like slice");

        },
        setLike: (state) => {
            state.curItemLiked = true;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getLikedVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.likedVideos = action.payload?.data
            })
            .addCase(checkIsLiked.fulfilled, (state, action) => {
                state.loading = false;
                state.curItemLiked = !!action.payload?.data;
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
export const { setLike, setUnlike } = likeSlice.actions;
export default likeSlice.reducer;