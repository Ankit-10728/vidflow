import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    getUserChannelProfile,
    getWatchHistory,
} from "../controllers/user.controller.js";
import {
    getAllSubscribedChannel,
    getAllSubscriber,
    subscribe,
    unsubscribe
} from "../controllers/subscription.controller.js";
import {
    getUserPlaylists,
} from "../controllers/playlist.controller.js"
import { getUserTweets } from "../controllers/tweet.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(
    verifyJWT,
    logoutUser
)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(
    verifyJWT,
    changePassword
)
router.route('/get-user').get(
    verifyJWT,
    getCurrentUser
)
router.route('/update-account').post(
    verifyJWT,
    updateAccountDetails
)
router.route('/update-avatar').patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)
router.route('/update-coverimage').patch(
    verifyJWT,
    upload.single("coverImage"),
    updateCoverImage
)

router.route('/watch-history').get(
    verifyJWT,
    getWatchHistory
)

router.route("/subscribed-channel").get(
    verifyJWT,
    getAllSubscribedChannel
)

router.route("/subscriber").get(
    verifyJWT,
    getAllSubscriber
)

router.route('/:userId/tweets').get(getUserTweets)

router.route('/c/:username').get(getUserChannelProfile)
router.route('/:userId/subscribe').post(
    verifyJWT,
    subscribe
)

router.route('/:userId/unsubscribe').post(
    verifyJWT,
    unsubscribe
)

router.route('/:userId/playlists').get(
    getUserPlaylists
)


export default router