
import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubscribedChannels = createAsyncThunk(
    "subscription/getSubscribedChannels",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/user/subscribed-channel");
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getSubscribers = createAsyncThunk(
    "subscription/getSubscribers",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/user/subscriber");
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const subscribeUser = createAsyncThunk(
    "subscription/subscribeUser",
    async (userId, thunkApi) => {
        try {
            const res = await api.post(`/user/${userId}/subscribe`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const unsubscribeUser = createAsyncThunk(
    "subscription/unsubscribeUser",
    async (userId, thunkApi) => {
        try {
            const res = await api.post(`/user/${userId}/unsubscribe`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

