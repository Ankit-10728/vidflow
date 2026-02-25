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
                if (action.payload?.data) {
                    state.playlists.myPlaylist.unshift(action.payload.data);
                }
            })

            .addCase(removeFromPlaylist.fulfilled, (state, action) => {
                state.loading = false;
                const playlistId = action.payload.data._id;
                state.playlists.myPlaylist = state.playlists.myPlaylist.map((p) => p._id === playlistId ? action.payload?.data : p);
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