import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    like,
    unlike,
    getLikedItems
} from "../controllers/like.controller.js"

const router = Router();
router.use(verifyJWT);

router.route("/videos/:id/like").post(like("Video"))
router.route("/tweets/:id/like").post(like("Tweet"))
router.route("/videos/:id/unlike").post(unlike("Video"))
router.route("/tweets/:id/unlike").post(unlike("Tweet"))
router.route("/like/videos").get(getLikedItems("Video"))
router.route("/like/tweets").get(getLikedItems("Tweet"))

export default router
