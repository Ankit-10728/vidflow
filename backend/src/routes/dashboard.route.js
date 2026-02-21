import { Router } from "express";
import {
    getChannelStats,
    getChannelVideos
} from "../controllers/dashboard.controller.js"

const router = Router();

router.route('/:id').get(getChannelStats)
router.route('/videos/:id').get(getChannelVideos)

export default router