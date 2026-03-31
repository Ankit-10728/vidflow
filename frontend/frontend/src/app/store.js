import { configureStore } from '@reduxjs/toolkit'
import commentReducer from '../features/comment/commentSlice.js'
import dashboardReducer from '../features/dashboard/dashboardSlice.js'
import healthReducer from '../features/health/healthSlice.js'
import likeReducer from '../features/like/likeSlice.js'
import playlistReducer from '../features/playlist/playlistSlice.js'
import tweetReducer from '../features/tweet/tweetSlice.js'
import userReducer from '../features/user/userSice.js'
import videoReducer from '../features/video/videoSlice.js'
import navReducer from "../features/nav/navSlice.js"
import subscriptionReducer from "../features/subscription/subscriptionSlice.js"

export const store = configureStore({
    reducer: {
        user: userReducer,
        video: videoReducer,
        tweet: tweetReducer,
        playlist: playlistReducer,
        like: likeReducer,
        health: healthReducer,
        dashboard: dashboardReducer,
        comment: commentReducer,
        nav: navReducer,
        subscriber: subscriptionReducer
    },
})