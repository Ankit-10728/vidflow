import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    like,
    unlike,
    getLikedItems,
    checkLike
} from "../controllers/like.controller.js"

const router = Router();
router.use(verifyJWT);

router.route("/videos/:id/like").post(like("Video"))
router.route("/videos/checkLike/:id").get(checkLike("Video"))
router.route("/tweets/:id/like").post(like("Tweet"))
router.route("/videos/:id/unlike").post(unlike("Video"))
router.route("/tweets/:id/unlike").post(unlike("Tweet"))
router.route("/like/videos/:id").get(getLikedItems("Video"))
router.route("/like/tweets/:id").get(getLikedItems("Tweet"))

export default router
