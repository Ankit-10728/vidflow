import { createSlice } from "@reduxjs/toolkit";
import {
    getUserTweets,
    updateTweet,
    deleteTweet,
    createTweet
} from "./tweetApi";

const initialState = {
    tweets: {
        myTweets: [],
        userTweets: [],
    },

    loading: {
        create: false,
        update: false,
        getUserTweets: false,
        delete: false,
    },

    error: {
        create: null,
        update: null,
        getUserTweets: null,
        delete: null,
    },
};

const uploadThunks = [createTweet];
const updateThunks = [updateTweet];
const fetchUserTweetsThunks = [getUserTweets];
const deleteThunks = [deleteTweet];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createTweet.fulfilled, (state, action) => {
                state.loading.create = false;

                if (action.payload?.data) {
                    state.tweets.myTweets.unshift(action.payload.data);
                }
            })

            .addCase(updateTweet.fulfilled, (state, action) => {
                state.loading.update = false;
                state.tweets.myTweets = state.tweets.myTweets.map((tweet) => (tweet._id == action.payload.data._id) ? action.payload.data : tweet)
            })

            .addCase(getUserTweets.fulfilled, (state, action) => {
                state.loading.getUserTweets = false;
                state.tweets.userTweets = action.payload?.data;
            })

            .addCase(deleteTweet.fulfilled, (state, action) => {
                state.loading.delete = false;

                const id = action.payload.tweetId;
                state.tweets.myTweets = state.tweets.myTweets.filter((tweet) => tweet._id !== id);
            })

            .addMatcher(isPending(uploadThunks), (state) => {
                state.loading.create = true;
                state.error.create = null;
            })

            .addMatcher(isPending(updateThunks), (state) => {
                state.loading.update = true;
                state.error.update = null;
            })

            .addMatcher(isPending(fetchUserTweetsThunks), (state) => {
                state.loading.getUserTweets = true;
                state.error.getUserTweets = null;
            })

            .addMatcher(isPending(deleteThunks), (state) => {
                state.loading.delete = true;
                state.error.delete = null;
            })

            .addMatcher(isRejected(uploadThunks), (state, action) => {
                state.loading.create = false;
                state.error.create = action.payload;
            })

            .addMatcher(isRejected(updateThunks), (state, action) => {
                state.loading.update = false;
                state.error.update = action.payload;
            })

            .addMatcher(isRejected(fetchUserTweetsThunks), (state, action) => {
                state.loading.getUserTweets = false;
                state.error.getUserTweets = action.payload;
            })

            .addMatcher(isRejected(deleteThunks), (state, action) => {
                state.loading.delete = false;
                state.error.delete = action.payload;
            });
    },
});

export default tweetSlice.reducer;