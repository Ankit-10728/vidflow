import { getSubscribedChannels, getSubscribers } from "./subscriptionApi.js"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
    subscribers: {},
    loading: false,
    error: null
}

const thunks = [getSubscribedChannels, getSubscribers];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);


const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getSubscribedChannels.fulfilled, (state, action) => {
                state.loading = false;
                state.channels = action.payload.data;
            })

            .addCase(getSubscribers.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers = action.payload
            })

            .addMatcher(isPending(thunks), (state) => {
                state.loading = true;
                state.error = null;
            })

            .addMatcher(isRejected(thunks), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default subscriptionSlice.reducer;