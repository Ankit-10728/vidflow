import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getChannelStats = createAsyncThunk(
    "dashboard/getChannelStats",
    async (channelId, thunkApi) => {
        try {
            const res = await api.get(`/dashboard/${channelId}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getChannelVideos = createAsyncThunk(
    "dashboard/getChannelVideos",
    async (channelId, thunkApi) => {
        try {
            const res = await api.get(`/dashboard/videos/${channelId}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getChannelTweets = createAsyncThunk(
    "dashboard/getChannelTweets",
    async (channelId, thunkApi) => {
        try {
            const res = await api.get(`/dashboard/tweets/${channelId}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);