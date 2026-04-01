import { Router } from "express";
import {
    getChannelStats,
    getChannelVideos,
    getChannelTweets
} from "../controllers/dashboard.controller.js"

const router = Router();

router.route('/:id').get(getChannelStats)
router.route('/videos/:id').get(getChannelVideos)
router.route('/tweets/:id').get(getChannelTweets)

export default router