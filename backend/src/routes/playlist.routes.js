import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    getPlaylistById
} from "../controllers/playlist.controller.js"

const router = Router();
router.use(verifyJWT);

router.route("/create").post(createPlaylist);
router.route("/:playlistId/delete").delete(deletePlaylist);
router.route("/:playlistId/videos/:videoId").post(addToPlaylist);
router.route("/:playlistId/videos/:videoId").delete(removeFromPlaylist);
router.route("/:playlistId").get(getPlaylistById);

export default router