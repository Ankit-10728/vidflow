import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const uploadVideo = createAsyncThunk(
    "video/uploadVideo",
    async (formData, thunkApi) => {
        try {
            const res = await api.post("/video/upload", formData, {
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

export const getVideoById = createAsyncThunk(
    "video/getVideoById",
    async (videoId, thunkApi) => {
        try {
            const res = await api.get(`/video/${videoId}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getAllVideosOfUser = createAsyncThunk(
    "video/getAllVideosOfUser",
    async (userId, thunkApi) => {
        try {
            const res = await api.get(`/video/${userId}/All-videos`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const deleteVideo = createAsyncThunk(
    "video/deleteVideo",
    async (videoId, thunkApi) => {
        try {
            const res = await api.delete(`/video/${videoId}/delete`, {
                withCredentials: true,
            });
            return { videoId, data: res.data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);
