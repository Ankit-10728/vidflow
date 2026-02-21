import api from "../../api/axios.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHealthStatus = createAsyncThunk(
    "health/getHealthStatus",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/health");
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);