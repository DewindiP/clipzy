import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import cloudinary from "./src/config/cloudinary.js";
import Video from "./src/models/Video.js";
import dotenv from "dotenv";

dotenv.config();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

async function migrateVideos() {
  await mongoose.connect(process.env.MONGO_URI);
  const videos = await Video.find({});
  let migrated = 0;

  for (const video of videos) {
    // Only migrate if videoUrl is a local file
    if (video.videoUrl && !video.videoUrl.startsWith("http")) {
      const localPath = path.join(UPLOADS_DIR, video.videoUrl);
      if (fs.existsSync(localPath)) {
        try {
          const result = await cloudinary.uploader.upload(localPath, {
            resource_type: "video",
            folder: "clipzy_videos",
            public_id: Date.now() + "-" + video.videoUrl.replace(/\.[^/.]+$/, "")
          });
          video.videoUrl = result.secure_url;
          await video.save();
          migrated++;
          console.log(`Migrated: ${video.videoUrl}`);
        } catch (err) {
          console.error(`Failed to migrate ${video.videoUrl}:`, err.message);
        }
      } else {
        console.warn(`File not found: ${localPath}`);
      }
    }
  }
  console.log(`Migration complete. Migrated ${migrated} videos.`);
  mongoose.disconnect();
}

migrateVideos();
