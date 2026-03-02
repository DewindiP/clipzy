import React, { useRef, useState, useEffect } from "react";
import API from "../api/api";
import CommentList from "./CommentList";
import { useAuth } from "../context/AuthContext";

export default function VideoCard({ video }) {
    const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    if (user && video.likes) {
      setLiked(video.likes.map(String).includes(String(user._id)));
    }
    setLikeCount(video.likes?.length || 0);
    // Fetch comment count
    API.get(`/comments/${video._id}`).then(res => setCommentCount(res.data.length)).catch(() => setCommentCount(0));
  }, [video.likes, user, video._id]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Listen for play/pause events to sync state if user uses keyboard or other controls
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    vid.addEventListener('play', onPlay);
    vid.addEventListener('pause', onPause);
    return () => {
      vid.removeEventListener('play', onPlay);
      vid.removeEventListener('pause', onPause);
    };
  }, [videoRef]);

  const handleLike = async () => {
    if (!user) return;
    try {
      const { data } = await API.post(`/videos/${video._id}/like`);
      setLiked(data.liked);
      setLikeCount(data.likes);
    } catch {}
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments/${video._id}`);
      setComments(data);
    } catch {}
  };

  const handleComment = async (e) => {
    e.preventDefault();
    setCommentError("");
    if (!user || !commentText.trim()) return;
    setCommentLoading(true);
    try {
      await API.post(`/comments`, { videoId: video._id, text: commentText });
      setCommentText("");
      await fetchComments();
    } catch {
      setCommentError("Failed to post comment.");
    }
    setCommentLoading(false);
  };

  useEffect(() => {
    if (showComments) fetchComments();
    // eslint-disable-next-line
  }, [showComments]);

  // aspectStyle replaced by Tailwind classes

  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      <div className="w-full max-w-[360px] h-[500px] bg-black rounded-2xl relative overflow-hidden mx-auto">
        <video
          ref={videoRef}
          src={video?.videoUrl}
          className="w-full h-full object-cover rounded-2xl"
          controls={false}
          loop
          onClick={handleVideoClick}
        />
        {/* Play/Pause Button Overlay */}
        {!isPlaying && (
          <button
            onClick={handleVideoClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 border-none rounded-full w-16 h-16 flex items-center justify-center cursor-pointer z-10"
            aria-label="Play"
          >
            {/* Play Icon SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.3)" />
              <polygon points="16,12 30,20 16,28" fill="#fff" />
            </svg>
          </button>
        )}
        {/* Like & Comment buttons */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-6">
          <button
            onClick={handleLike}
            className={`bg-none border-none text-[2rem] cursor-pointer mb-2 ${liked ? 'text-[#ff6a88]' : 'text-white'}`}
            title="Like"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 4 8.5 4C10.5 4 12 6 12 6C12 6 13.5 4 15.5 4C17.5 4 20 5.5 20 8.5C20 13.5 12 21 12 21Z" stroke={liked ? "#ff6a88" : "#fff"} strokeWidth="2" fill={liked ? "#ff6a88" : "none"} />
            </svg>
            <div className={`text-center text-[1rem] ${liked ? 'text-[#ff6a88]' : 'text-white'}`}>{likeCount}</div>
          </button>
          <button
            onClick={() => setShowComments(true)}
            className={`bg-none border-none text-[2rem] cursor-pointer ${showComments ? 'text-[#ff6a88]' : 'text-white'}`}
            title="Comment"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke={showComments ? "#ff6a88" : "#fff"} strokeWidth="2" fill="none" />
            </svg>
            <div className={`text-center text-[1rem] ${showComments ? 'text-[#ff6a88]' : 'text-white'}`}>{commentCount}</div>
          </button>
        </div>
        {/* User & Caption bottom left */}
        <div className="absolute left-4 bottom-4 text-white drop-shadow-[0_2px_8px_#000]">
          <div className="font-bold text-[1rem]">@{video.user?.username || "user"}</div>
          <div className="text-[0.95rem] opacity-85">{video.caption}</div>
        </div>
      </div>
      {/* Comments Popup */}
      {showComments && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-[1000] flex items-center justify-center"
          onClick={() => setShowComments(false)}
        >
          <div
            className="bg-[#232a3b] rounded-xl p-6 max-w-[400px] w-[90vw] max-h-[80vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowComments(false)}
              className="absolute top-2 right-2 bg-none border-none text-white text-[1.5rem] cursor-pointer"
            >&times;</button>
            <h3 className="text-white mb-3">Comments</h3>
            <form onSubmit={handleComment} className="flex gap-2 mb-3">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded-lg border border-[#444] bg-[#181f2a] text-white p-2"
              />
              <button
                type="submit"
                className={`bg-[#ff6a88] text-white border-none rounded-lg px-4 py-2 font-semibold ${commentLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={commentLoading}
              >Post</button>
            </form>
            {commentError && <div className="text-[#ff6a88] mb-2">{commentError}</div>}
            <CommentList comments={comments.map(c => ({ user: c.user?.username, text: c.text }))} />
          </div>
        </div>
      )}
    </div>
  );
}