import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, login } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const { data } = await API.get("/videos");
        if (user?._id) {
          setVideos(data.filter(v => v.user?._id === user._id));
        } else {
          setVideos([]);
        }
      } catch (err) {
        setVideos([]);
      }
      setLoading(false);
    };
    fetchMyVideos();
  }, [user]);
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { data } = await API.post("/auth/avatar", formData, { headers: { "Content-Type": "multipart/form-data" } });
      login({ ...user, avatar: data.avatar, token: user.token });
    } catch {
      alert("Failed to upload avatar");
    }
    setAvatarUploading(false);
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    setDeletingId(videoId);
    try {
      await API.delete(`/videos/${videoId}`);
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch {
      alert("Failed to delete video.");
    }
    setDeletingId(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <h2 className="text-[1.5rem] font-bold mb-4">Profile</h2>
        <div className="w-full max-w-[400px] text-center">
          <div className="w-[80px] h-[80px] rounded-full bg-[#444] mx-auto mb-4 relative overflow-hidden">
            <img
              src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.username || "U")}
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#222] text-white border-none rounded-full w-[28px] h-[28px] flex items-center justify-center cursor-pointer opacity-85 z-20"
              title="Change profile image"
              disabled={avatarUploading}
            >
              {avatarUploading ? "⏳" : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.91V15a1.65 1.65 0 0 0-1-1.51A1.65 1.65 0 0 0 3 12.09V12a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.09 5H9a1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.09V9a1.65 1.65 0 0 0 1 1.51V12a2 2 0 0 1-2 2h-.09A1.65 1.65 0 0 0 19.4 15z"/></svg>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
            </button>
          </div>
          <p className="font-bold mt-2">@{user?.username || "username"}</p>
        </div>
        <div className="mt-8 w-full max-w-[700px] grid grid-cols-3 gap-[18px]">
          {loading ? <p>Loading...</p> : videos.length === 0 ? <p>No videos uploaded yet.</p> : videos.map((video, idx) => (
            <div key={video._id || idx} className="relative w-full aspect-[9/16] rounded-[14px] overflow-hidden bg-transparent">
              <video
                src={video.videoUrl}
                className="w-full h-full object-cover block"
                controls
              />
              <button
                onClick={() => handleDelete(video._id)}
                disabled={deletingId === video._id}
                className="absolute top-[10px] right-[10px] bg-[rgba(0,0,0,0.6)] border-none rounded-full w-[36px] h-[36px] flex items-center justify-center text-white cursor-pointer opacity-85 transition-colors duration-200 z-20"
                title="Delete video"
              >
                {deletingId === video._id ? (
                  <span className="text-[20px]">⏳</span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}