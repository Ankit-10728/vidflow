import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTweet = createAsyncThunk(
    "tweet/createTweet",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/tweet/create", data, {
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


export const deleteTweet = createAsyncThunk(
    "tweet/deleteTweet",
    async (tweetId, thunkApi) => {
        try {
            const res = await api.delete(`/tweet/${tweetId}/delete`, {
                withCredentials: true,
            });
            return { tweetId, data: res.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);


export const updateTweet = createAsyncThunk(
    "tweet/updateTweet",
    async ({ tweetId, content }, thunkApi) => {
        try {
            const res = await api.patch(
                `/tweet/${tweetId}/update`,
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

export const getUserTweets = createAsyncThunk(
    "tweet/getUserTweets",
    async (userId, thunkApi) => {
        try {
            const res = await api.get(`/user/${userId}/tweets`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);