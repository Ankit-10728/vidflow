import api from "../../api/axios.api.js"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/user/get-user");
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (formData, thunkApi) => {
        try {
            const res = await api.post("/user/register", formData, { withCredentials: true });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/login", data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkApi) => {
        try {
            const res = await api.post("/user/logout");
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const updateAccountDetails = createAsyncThunk(
    "user/updateAccountDetails",
    async (formData, thunkApi) => {
        try {
            const res = await api.post("/user/update-account", formData, { withCredentials: true });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const updateUserAvatar = createAsyncThunk(
    "user/updateUserAvatar",
    async (formData, thunkApi) => {
        try {
            const res = await api.post("/user/update-avatar", formData, { withCredentials: true });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);


export const updateCoverImage = createAsyncThunk(
    "user/updateCoverImage",
    async (formData, thunkApi) => {
        try {
            const res = await api.post("/user/update-coverimage", formData, { withCredentials: true });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const getUserChannelProfile = createAsyncThunk(
    "user/getUserChannelProfile",
    async (username, thunkApi) => {
        try {
            const res = await api.get(`/user/c/${username}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const getWatchHistory = createAsyncThunk(
    "user/getWatchHistory",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/user/watch-history");
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/user/change-password", data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message })
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    "user/refreshAccessToken",
    async (_, thunkApi) => {
        try {
            const res = await api.post("/user/refresh-token", {}, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



// TODO: needs to be checked



export const getUserPlaylists = createAsyncThunk(
    "playlist/getUserPlaylists",
    async (userId, thunkApi) => {
        try {
            const res = await api.get(`/user/${userId}/playlists`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);


