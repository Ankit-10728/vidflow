import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createComment,
    deleteComment,
    updateComment,
    getComments
} from "../controllers/comment.controller.js"

const router = Router();
router.use(verifyJWT);

router.route("/videos/:id")
    .post(createComment("Video"))
    .delete(deleteComment("Video"))
    .get(getComments("Video"))
    .patch(updateComment("Video"))

router.route("/tweets/:id")
    .post(createComment("Tweet"))
    .delete(deleteComment("Tweet"))
    .get(getComments("Tweet"))
    .patch(updateComment("Tweet"))

export default router