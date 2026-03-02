import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadVideo,
  getVideos,
  likeVideo,
  deleteVideo,
} from "../controllers/videoController.js";

const router = express.Router();


router.get("/", getVideos);
router.post("/", protect, upload.single("video"), uploadVideo);
router.post("/:id/like", protect, likeVideo);
router.delete("/:id", protect, deleteVideo);

export default router;