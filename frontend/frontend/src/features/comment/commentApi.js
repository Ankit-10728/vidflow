import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createVideoComment = createAsyncThunk(
    "comment/createVideoComment",
    async ({ videoId, content }, thunkApi) => {
        try {
            console.log("reached");

            const res = await api.post(
                `/comment/videos/${videoId}`,
                { content },
                { withCredentials: true }
            );

            console.log(res);

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
                `/comment/tweets/${tweetId}`,
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
            const res = await api.get(`/comment/videos/${videoId}`, {
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
            const res = await api.get(`/comment/tweets/${tweetId}`, {
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
                `/comment/videos/${videoId}`,
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
                `/comment/tweets/${tweetId}`,
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
                `/comment/videos/${videoId}`,
                { withCredentials: true }
            );
            console.log("delete api reached");
            console.log(res.data);

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
                `/comment/tweets/${tweetId}`,
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