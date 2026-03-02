import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clipzy_avatars",
    resource_type: "image",
    format: async (req, file) => "png",
    public_id: (req, file) => Date.now() + "-" + file.originalname.replace(/\.[^/.]+$/, "")
  },
});

export default multer({ storage: avatarStorage });
