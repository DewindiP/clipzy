import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clipzy_videos",
    resource_type: "video",
    format: async (req, file) => "mp4", // force mp4
    public_id: (req, file) => Date.now() + "-" + file.originalname.replace(/\.[^/.]+$/, "")
  },
});

export default multer({ storage });