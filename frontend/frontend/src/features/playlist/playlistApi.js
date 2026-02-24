import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPlaylist = createAsyncThunk(
    "playlist/createPlaylist",
    async (data, thunkApi) => {
        try {
            const res = await api.post("/playlist/create", data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const deletePlaylist = createAsyncThunk(
    "playlist/deletePlaylist",
    async (playlistId, thunkApi) => {
        try {
            const res = await api.delete(`/playlist/${playlistId}/delete`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

// export const addToPlaylist = createAsyncThunk(
//     "playlist/addToPlaylist",
//     async ({ playlistId, videoId }, thunkApi) => {
//         try {
//             const res = await api.post(
//                 `/playlist/${playlistId}/videos/${videoId}`
//             );
//             return res.data;
//         } catch (error) {
//             return thunkApi.rejectWithValue(
//                 error.response?.data || { message: error.message }
//             );
//         }
//     }
// );

export const removeFromPlaylist = createAsyncThunk(
    "playlist/removeFromPlaylist",
    async ({ playlistId, videoId }, thunkApi) => {
        try {
            const res = await api.delete(
                `/playlist/${playlistId}/videos/${videoId}`
            );
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const getPlaylistById = createAsyncThunk(
    "playlist/getPlaylistById",
    async (playlistId, thunkApi) => {
        try {
            const res = await api.get(`/playlist/${playlistId}`);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);
