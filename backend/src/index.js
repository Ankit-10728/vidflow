import dotenv from 'dotenv'
import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from './constants.js'
import { app } from './app.js';
dotenv.config({
    path: './env'
})

console.log("SERVER FILE LOADED");

// const app = express()

; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error : " + error);
            throw error
        })

        const PORT = process.env.PORT || 8000;

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        })

    } catch (error) {
        console.log("Mongo DB connection failed : " + error);
        throw error
    }
})()