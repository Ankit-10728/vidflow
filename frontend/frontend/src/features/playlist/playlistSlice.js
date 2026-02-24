import {
    deletePlaylist,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    getPlaylistById
} from "./playlistApi.js"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    playlists: {
        myPlaylist: [],
        playlistUser: []
    },
    loading: false,
    error: null
}

const thunks = [deletePlaylist, createPlaylist, addToPlaylist, removeFromPlaylist, getPlaylistById]

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload?.data) {
                    state.playlists.myPlaylist.unshift(action.payload.data);
                }
            })

            .addCase(removeFromPlaylist.fulfilled, (state, action) => {
                state.loading = false;
            })

            .addCase(getPlaylistById.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.data) state.playlists.playlistUser.unshift(action.payload.data);
            })

            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.loading = false;

                const { plalistId } = action.payload.data;
                state.playlists.myPlaylist = state.playlists.myPlaylist.filter((p) => p._id !== plalistId);
            })

            .addMatcher(isPending(thunks), (state) => {
                state.loading = true;
                state.error = null;
            })

            .addMatcher(isRejected(thunks), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default playlistSlice.reducer;