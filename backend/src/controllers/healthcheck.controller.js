import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;

        const isDbHealthy = dbState === 1;

        const healthStatus = {
            status: isDbHealthy ? "ok" : "error",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: isDbHealthy ? "connected" : "disconnected"
        };

        if (!isDbHealthy) {
            return res.status(503).json(
                new ApiResponse(503, healthStatus, "health status")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, healthStatus, "health status")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, error.message)
        );
    }
})

export { healthCheck };
