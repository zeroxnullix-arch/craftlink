import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * uploadOnCloudinary - Uploads a file to Cloudinary and cleans up the local copy
 * 
 * @param {string} filePath - Path to the local file to upload
 * @returns {Object|null} Cloudinary upload response or null if no filePath provided
 * @throws {Error} If upload fails or environment variables are missing
 */
const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
    });
    fs.unlinkSync(filePath);
    return uploadResult;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export default uploadOnCloudinary;
