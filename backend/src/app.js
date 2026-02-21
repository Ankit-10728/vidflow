import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import healthRouter from "./routes/health.routes.js"
import dashboardRouter from "./routes/dashboard.route.js"

//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/tweet", tweetRouter)
app.use("/api/v1/health", healthRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/", likeRouter)
app.get("/", (req, res) => {
    res.send("server alive");
});
export { app }

// TODO : get user tweets not working (error retrieving data from the post man)
// TODO : need to set up get user video through video id