import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { ApiError } from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);


const uploadOnCloudinary = async (localFilePath, folder) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: `users/${folder}`,
            resource_type: 'auto'
        })
        console.log("file is uploaded on cloudinary : " + response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw new ApiError(400, "Error deleting file from cloudinary")
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }