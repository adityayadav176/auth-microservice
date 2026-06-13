import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) {
            return res.status(400).json({message: "FilePath Required"});
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        if(fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        console.log("Cloudinary Error: ", error);

        if(localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export {
    uploadOnCloudinary
};