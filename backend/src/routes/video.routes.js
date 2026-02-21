import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToPlaylist } from "../controllers/playlist.controller.js";
import {
    uploadVideo,
    deleteVideo,
    getVideo,
    getAllVideosOfUser
} from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload").post(
    verifyJWT,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    uploadVideo)
router.route("/:userId/All-videos").get(getAllVideosOfUser)
router.route("/:videoId/delete").delete(verifyJWT, deleteVideo)
router.route("/:videoId").get(getVideo)



export default router