import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createVideoComment = createAsyncThunk(
    "comment/createVideoComment",
    async ({ videoId, content }, thunkApi) => {
        try {
            const res = await api.post(
                `/comments/videos/${videoId}`,
                { content },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const createTweetComment = createAsyncThunk(
    "comment/createTweetComment",
    async ({ tweetId, content }, thunkApi) => {
        try {
            const res = await api.post(
                `/comments/tweets/${tweetId}`,
                { content },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);


export const getVideoComments = createAsyncThunk(
    "comment/getVideoComments",
    async (videoId, thunkApi) => {
        try {
            const res = await api.get(`/comments/videos/${videoId}`, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getTweetComments = createAsyncThunk(
    "comment/getTweetComments",
    async (tweetId, thunkApi) => {
        try {
            const res = await api.get(`/comments/tweets/${tweetId}`, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);


export const updateVideoComment = createAsyncThunk(
    "comment/updateVideoComment",
    async ({ videoId, content }, thunkApi) => {
        try {
            const res = await api.patch(
                `/comments/videos/${videoId}`,
                { content },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const updateTweetComment = createAsyncThunk(
    "comment/updateTweetComment",
    async ({ tweetId, content }, thunkApi) => {
        try {
            const res = await api.patch(
                `/comments/tweets/${tweetId}`,
                { content },
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);


export const deleteVideoComment = createAsyncThunk(
    "comment/deleteVideoComment",
    async (videoId, thunkApi) => {
        try {
            const res = await api.delete(
                `/comments/videos/${videoId}`,
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

export const deleteTweetComment = createAsyncThunk(
    "comment/deleteTweetComment",
    async (tweetId, thunkApi) => {
        try {
            const res = await api.delete(
                `/comments/tweets/${tweetId}`,
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