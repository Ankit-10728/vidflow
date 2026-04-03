import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const likeVideo = createAsyncThunk(
    "like/likeVideo",
    async (videoId, thunkApi) => {
        try {
            const res = await api.post(
                `/videos/${videoId}/like`,
                {},
                { withCredentials: true }
            );
            return { videoId, data: res.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const likeTweet = createAsyncThunk(
    "like/likeTweet",
    async (tweetId, thunkApi) => {
        try {
            const res = await api.post(
                `/tweets/${tweetId}/like`,
                {},
                { withCredentials: true }
            );
            return { tweetId, data: res.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const checkIsLiked = createAsyncThunk("like/checkLiked",
    async (videoId, thunkApi) => {
        try {
            console.log("THUNK CALLED with id:", videoId); // 👈 ADD THIS

            const res = await api.get(
                `/videos/checkLike/${videoId}/`,
                { withCredentials: true }
            );
            return { videoId, data: res.data.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
)

export const unlikeVideo = createAsyncThunk(
    "like/unlikeVideo",
    async (videoId, thunkApi) => {
        try {
            const res = await api.post(
                `/videos/${videoId}/unlike`,
                {},
                { withCredentials: true }
            );
            return { videoId, data: res.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const unlikeTweet = createAsyncThunk(
    "like/unlikeTweet",
    async (tweetId, thunkApi) => {
        try {
            const res = await api.post(
                `/tweets/${tweetId}/unlike`,
                {},
                { withCredentials: true }
            );
            return { tweetId, data: res.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);


export const getLikedVideos = createAsyncThunk(
    "like/getLikedVideos",
    async (id, thunkApi) => {
        try {
            const res = await api.get(`/like/videos/${id}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getLikedTweets = createAsyncThunk(
    "like/getLikedTweets",
    async (id, thunkApi) => {
        try {
            const res = await api.get(`/like/tweets/:${id}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);