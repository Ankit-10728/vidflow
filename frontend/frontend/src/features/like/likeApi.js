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
    async (_, thunkApi) => {
        try {
            const res = await api.get("/like/videos", {
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
    async (_, thunkApi) => {
        try {
            const res = await api.get("/like/tweets", {
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