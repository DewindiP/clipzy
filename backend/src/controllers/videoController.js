import Video from "../models/Video.js";
import { v2 as cloudinary } from "cloudinary";


// upload a video
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const video = await Video.create({
      user: req.user,
      caption: req.body.caption,
      videoUrl: req.file.path,
      public_id: req.file.filename // ⭐ THIS IS CORRECT FOR YOUR SETUP
    });

    res.json(video);

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
};


/* 
   GET ALL VIDEOS (FEED)
 */
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};


/* =========================
   LIKE / UNLIKE VIDEO
========================= */
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video)
      return res.status(404).json({ message: "Video not found" });

    const userId = req.user;
    // Compare as strings to handle ObjectId vs string
    const index = video.likes.map(id => id.toString()).indexOf(userId.toString());

    if (index === -1) {
      video.likes.push(userId);
    } else {
      video.likes.splice(index, 1);
    }

    await video.save();

    res.json({
      likes: video.likes.length,
      liked: index === -1
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to like video" });
  }
};


/* =========================
   DELETE VIDEO
========================= */
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video)
      return res.status(404).json({ message: "Video not found" });

    //  Check ownership
    if (video.user.toString() !== req.user) {
      return res.status(403).json({
        message: "Not authorized to delete this video"
      });
    }

    //  Delete from Cloudinary FIRST
    let publicId = video.public_id;
    // Fallback: extract from videoUrl if missing
    if (!publicId && video.videoUrl) {
      // videoUrl example: https://res.cloudinary.com/<cloud_name>/video/upload/v<version>/<public_id>.mp4
      const matches = video.videoUrl.match(/\/upload\/(?:v\d+\/)?(.+?)\.(mp4|mov|webm|avi|mkv)$/);
      if (matches && matches[1]) {
        publicId = matches[1];
      }
    }
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "video"
      });
    }

    //  Delete from MongoDB
    await video.deleteOne();

    res.json({ message: "Video deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete video" });
  }
};