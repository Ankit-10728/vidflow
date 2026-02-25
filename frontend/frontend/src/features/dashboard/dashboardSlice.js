import {
    getChannelStats,
    getChannelVideos
} from "./dashboardApi.js"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stats: {},
    videos: [],
    loading: false,
    error: null
}

const thunks = [getChannelStats, getChannelVideos]

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getChannelStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload?.data;
            })

            .addCase(getChannelVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload?.data
            })

            .addMatcher(isPending(thunks), (state) => {
                state.loading = true;
                state.error = null;
            })

            .addMatcher(isRejected(thunks), (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default dashboardSlice.reducer;