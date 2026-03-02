import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  caption: String,
  videoUrl: String,
  public_id: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
{ timestamps: true }
);

export default mongoose.model("Video", videoSchema);