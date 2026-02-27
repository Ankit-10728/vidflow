import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import fs from 'fs'
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const options = {
    httpOnly: true,
    secure: true,
}


const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId);
        const accessToken = await user.generateAcessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and acess token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //get user details  
    // validation - not empty
    // check user allready exists
    // if not, then check if it contains images , also check for avatar
    //if images -> upload to cloudinary, recheck if uploaded correctly
    // create user and save to mongo db
    // once done remove the encrypted password and refresh token before returnning
    // check for user creation
    // return res

    const { username, email, fullname, password } = req.body;
    console.log("email : " + email);

    if (
        [username, password, email, fullname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    console.log("before uploading to cloudinary");

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) throw new ApiError(400, "avatar is required...")
    console.log(avatarLocalPath);

    if (existedUser) {
        fs.unlinkSync(avatarLocalPath)
        fs.unlinkSync(coverImageLocalPath)

        throw new ApiError(400, "User with this email or username allready exists")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar")
    if (!avatar) throw new ApiError(400, "avatar is required")

    const coverImage = await uploadOnCloudinary(coverImageLocalPath, "coverImage")
    if (!coverImage) console.log("not uploaded");
    console.log("After upload to cloudinary")
    const user = await User.create({
        email,
        username: username?.toLowerCase(),
        fullname,
        avatar: {
            url: avatar.secure_url,
            publicId: avatar.public_id,
        },
        coverImage: {
            url: coverImage?.url || "",
            publicId: coverImage?.public_id || "",
        },
        password,
    })

    console.log("user" + user)

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    console.log("created user   " + createdUser)

    if (!createdUser) throw new ApiError(500, "Something went wrong while registering...")

    return res.status(200).json(
        new ApiResponse(201, createdUser, "user created successfully..")
    )

})


const loginUser = asyncHandler(async (req, res) => {
    // get the data form the front end
    // validate the data (should not be empty
    // check the data exist in the database
    // verify the password
    // generate the acess abd refresh tkaen 
    // assign and store the access token and refresh token
    // login and redirect 
    const { username, password } = req.body;

    if (
        [username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Username or Password is incorrect");
    }

    const user = await User.findOne({ username });

    if (!user) throw new ApiError(404, "User with this credential does not exist");
    const verify = await user.isPasswordCorrect(password);

    if (!verify) throw new ApiError(404, "Password or Username is Incorrect");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                user,
                accessToken,
                refreshToken
            },
                "user loggend in successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    // current user -> its id
    // erase access token

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, { userId: req.user._id }, "User logged out"));

})


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;
    if (!fullname || fullname.trim() === "") throw new ApiError(400, "Fullname is required");
    if (!email || email.trim() === "") throw new ApiError(400, "Email is required");

    const user = await User.findById(req.user._id);

    user.email = email.toLowerCase().trim();
    user.fullname = fullname.toLowerCase().trim();

    await user.save({ validateBeforeSave: false });

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Updated Successfully"
            )
        )

})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) return new ApiError(400, "Avatar is required");

    const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");

    if (!avatar.secure_url) throw new ApiError(400, "error uploading avatar")

    const user = await User.findById(req.user._id);

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: {
                    url: avatar.secure_url,
                    publicId: avatar.public_id,
                }
            }
        },
        { new: true }
    )

    const deletePreviosAvatar = await deleteFromCloudinary(user.avatar.publicId);
    if (!deletePreviosAvatar) throw new ApiError(400, "Error deleting avatar from cloudinay");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedUser,
                "Avatar updated Successfully"
            )
        )
})

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImagePath = req.file?.path;
    if (!coverImagePath) throw new ApiError(400, "Cover Image is not available");

    const user = await User.findById(req.user._id);

    const coverImage = await uploadOnCloudinary(coverImagePath, "coverImage");
    if (!coverImage.url) throw new ApiError(400, "error uploading the coverimage");

    const afterDeletion = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                coverImage: {
                    url: coverImage?.url || "",
                    publicId: coverImage?.public_id || "",
                }
            }
        },
        { new: true }
    )

    console.log(afterDeletion);

    const deletePreviosCoverImage = await deleteFromCloudinary(user.coverImage.publicId);
    if (!deletePreviosCoverImage) throw new ApiError(400, "Error deleting coverimage form cloudinary");

    return res
        .status(200)
        .json(
            new ApiResponse(200, afterDeletion, "CoverImage updated successfully")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "User fetched successfully"
            )
        )
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Both passwords are required");
    }

    if (
        [oldPassword, newPassword].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "Password is invalid")
    }

    if (!oldPassword || !newPassword) throw new ApiError(400, "UserName or Password is invalid");

    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(400, "Username with this credential doesnot exist");

    const checkPassword = await user.isPasswordCorrect(oldPassword);
    if (!checkPassword) throw new ApiError(404, "Password is incorrect");

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Password changed successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    console.log("cookies :" + req.cookies);
    console.log(req.cookies);

    const incomingRefreshToken = req.cookies?.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(400, "Unauthorized Access");

    const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decodedToken) throw new ApiError(400, "Invalid refresh token");

    const user = await User.findById(decodedToken._id);
    if (!user) throw new ApiError(400, "Refresh token is either expired or used");

    if (user.refreshToken !== incomingRefreshToken) throw new ApiError(400, "Refresh token is either expired or used");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    user.refreshToken = refreshToken;

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "Acess toen assignes successfully"
            )
        )
})


const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) throw new ApiError(400, "username is missing");

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase(),
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscriber",
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            }
        },
        {
            $addFields: {
                subscriberCount: {
                    $size: "$subscriber"
                },
                channelsSubscribedTo: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, ["$subscribers.subscriber"]] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                username: 1,
                isSubscribed: 1,
                subscriberCount: 1,
                fullname: 1,
                channelsSubscribedTo: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
            }
        }
    ])

    if (!channel?.length) throw new ApiError(400, "channel does not exist");

    return res
        .status(200)
        .json(
            new ApiResponse(200, channel[0], "user channel fetched successfully")
        )

})

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [{
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner",
                        pipeline: [
                            {
                                $project: {
                                    avatar: 1,
                                    fullname: 1,
                                    username: 1,
                                }
                            }
                        ]
                    }
                },
                {
                    $addFields: {
                        owner: {
                            $first: '$owner'
                        }
                    }
                }
                ]
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, user[0].watchHistory, "fetched watchHistory")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    getUserChannelProfile,
    getWatchHistory,
}