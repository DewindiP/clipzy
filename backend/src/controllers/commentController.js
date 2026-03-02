import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const comment = await Comment.create({
      video: videoId,
      user: req.user,
      text,
    });
    res.json(await comment.populate("user", "username"));
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to get comments" });
  }
};
