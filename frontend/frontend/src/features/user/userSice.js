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
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    channelProfile: {},
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
    isAuthChecked: false,
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
    reducers: {
        clearChannelProfile: (state) => {
            state.channelProfile = {};
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading.auth = false;
                console.log(action.payload.data);
                console.log("userslice");

                state.user = action?.payload?.data?.user;
                state.isAuthenticated = true;
                toast.success("Login successful ✅");
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading.auth = false;
                state.user = action.payload.data;
                state.isAuthenticated = false;
                toast.success("User Registered Successfully ^_^");
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loading.auth = false;
                state.user = null;
                state.isAuthenticated = false;
                state.playlists = [];
                state.watchHistory = [];
                toast.success("Logged out 👋");
            })

            .addCase(refreshAccessToken.fulfilled, (state) => {
                state.loading.auth = false;
                state.isAuthenticated = true;
                state.isAuthChecked = true;
            })

            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user = action.payload;
                state.isAuthChecked = true;
                state.isAuthenticated = true;

            })

            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading.profile = false;
                state.user = null;
                state.isAuthenticated = false;
                state.isAuthChecked = true;
            })

            .addCase(updateAccountDetails.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user = action.payload.data;
                toast.success("Profile updated ✏️");
            })

            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user.avatar = action.payload.data.avatar;
                toast.success("Profile updated ✏️");
            })

            .addCase(updateCoverImage.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user.coverImage = action.payload.data;
                toast.success("Profile updated ✏️");
            })

            .addCase(changePassword.fulfilled, (state) => {
                state.loading.profile = false;
                toast.success("Password changed ♨️");
            })

            .addCase(getUserChannelProfile.fulfilled, (state, action) => {
                state.loading.channel = false;
                const profile = action.payload.data;
                state.channelProfile[profile._id] = profile;
            })

            .addCase(getUserPlaylists.fulfilled, (state, action) => {
                state.loading.playlists = false;
                state.playlists = action.payload.data.data;
            })

            .addCase(getWatchHistory.fulfilled, (state, action) => {
                state.loading.history = false;
                state.watchHistory = action.payload.data.data;
            })

            .addMatcher(isPending(authThunks), (state) => {
                state.loading.auth = true;
                state.error.auth = null;
            })

            .addMatcher(isPending(profileThunks), (state) => {
                state.loading.profile = true;
                state.error.profile = null;
            })

            .addMatcher(isPending(playlistThunks), (state) => {
                state.loading.playlists = true;
                state.error.playlists = null;
            })


            .addMatcher(isPending(historyThunks), (state) => {
                state.loading.history = true;
                state.error.history = null;
            })

            .addMatcher(isPending(channelThunks), (state) => {
                state.loading.channel = true;
                state.error.channel = null;
            })

            .addMatcher(isRejected(authThunks), (state, action) => {
                state.loading.auth = false;
                console.log(action.payload)
                // state.error.auth = action?.payload?.error;
                state.error.auth = action.payload ||
                    action.payload?.message ||
                    action.payload?.error ||
                    action.error?.message ||
                    "Login failed";
            })

            .addMatcher(isRejected(profileThunks), (state, action) => {
                state.loading.profile = false;
                console.log("DEBUG: Current state.error is:", state.error);
                console.log("DEBUG: Action payload is:", action.payload);
                state.error.profile = action?.payload?.data;
            })

            .addMatcher(isRejected(playlistThunks), (state, action) => {
                state.loading.playlists = false;
                state.error.playlists = action.payload.data;
            })

            .addMatcher(isRejected(historyThunks), (state, action) => {
                state.loading.history = false;
                state.error.history = action.payload.data;
            })

            .addMatcher(isRejected(channelThunks), (state, action) => {
                state.loading.channel = false;
                state.error.channel = action.payload.data;
            });
    }

})
export const { clearChannelProfile } = userSlice.actions;
export default userSlice.reducer;