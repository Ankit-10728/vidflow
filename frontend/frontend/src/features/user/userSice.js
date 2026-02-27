import {
    fetchCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    updateAccountDetails,
    updateCoverImage,
    updateUserAvatar,
    changePassword,
    getUserChannelProfile,
    getUserPlaylists,
    getWatchHistory,
    refreshAccessToken
} from "./userApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    channelProfile: null,
    playlists: [],
    watchHistory: [],
    loading: {
        auth: false,
        profile: false,
        playlists: false,
        history: false,
        channel: false
    },
    error: {
        auth: null,
        profile: null,
        playlists: null,
        history: null,
        channel: null
    },
    isAuthenticated: false,
};

const authThunks = [loginUser, registerUser, logoutUser, refreshAccessToken];

const profileThunks = [
    fetchCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    changePassword,
];

const playlistThunks = [getUserPlaylists];
const historyThunks = [getWatchHistory];
const channelThunks = [getUserChannelProfile];

const isPending = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.pending.type);

const isRejected = (thunks) => (action) =>
    thunks.some((thunk) => action.type === thunk.rejected.type);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading.auth = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading.auth = false;
                state.user = null;
                state.isAuthenticated = false;
                state.playlists = [];
                state.watchHistory = [];
            })

            .addCase(refreshAccessToken.fulfilled, (state) => {
                state.loading.auth = false;
                state.isAuthenticated = true;
            })

            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })

            .addCase(updateAccountDetails.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user = action.payload;
            })

            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user.avatar = action.payload.avatar;
            })

            .addCase(updateCoverImage.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user.coverImage = action.payload;
            })

            .addCase(changePassword.fulfilled, (state) => {
                state.loading.profile = false;
            })

            .addCase(getUserChannelProfile.fulfilled, (state, action) => {
                state.loading.channel = false;
                state.channelProfile = action.payload;
            })

            .addCase(getUserPlaylists.fulfilled, (state, action) => {
                state.loading.playlists = false;
                state.playlists = action.payload.data;
            })

            .addCase(getWatchHistory.fulfilled, (state, action) => {
                state.loading.history = false;
                state.watchHistory = action.payload.data;
            })

            .addMatcher(isPending(authThunks), (state) => {
                state.loading.auth = true;
                state.error = null;
            })

            .addMatcher(isPending(profileThunks), (state) => {
                state.loading.profile = true;
                state.error = null;
            })

            .addMatcher(isPending(playlistThunks), (state) => {
                state.loading.playlists = true;
                state.error = null;
            })

            .addMatcher(isPending(historyThunks), (state) => {
                state.loading.history = true;
                state.error = null;
            })

            .addMatcher(isPending(channelThunks), (state) => {
                state.loading.channel = true;
                state.error = null;
            })

            .addMatcher(isRejected(authThunks), (state, action) => {
                state.loading.auth = false;
                state.error.auth = action.payload;
            })

            .addMatcher(isRejected(profileThunks), (state, action) => {
                state.loading.profile = false;
                state.error.profile = action.payload;
            })

            .addMatcher(isRejected(playlistThunks), (state, action) => {
                state.loading.playlists = false;
                state.error.playlists = action.payload;
            })

            .addMatcher(isRejected(historyThunks), (state, action) => {
                state.loading.history = false;
                state.error.history = action.payload;
            })

            .addMatcher(isRejected(channelThunks), (state, action) => {
                state.loading.channel = false;
                state.error.channel = action.payload;
            });
    }

})

export default userSlice.reducer;