import React, { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    if (!video) return setError("Please select a video file.");
    const formData = new FormData();
    formData.append("video", video);
    formData.append("caption", caption);
    setLoading(true);
    try {
      await API.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      setVideo(null);
      setCaption("");
      // Refresh home feed by navigating home
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-[1.5rem] font-bold mb-8 text-center dark:text-white">Upload Video</h2>
            <form onSubmit={handleUpload} className="w-full flex flex-col gap-4">
              <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} className="w-full border border-[#ccc] rounded px-3 py-2 bg-white text-black focus:outline-none" />
              <input type="text" placeholder="Write your caption..." value={caption} onChange={e => setCaption(e.target.value)} className="w-full border border-[#ccc] rounded px-3 py-2 bg-white text-black focus:outline-none" />
              <button type="submit" className={`w-full py-2 px-4 ${loading ? "bg-[#888]" : "bg-[#ff6a88] hover:bg-[#ff4f7a]"} text-white border-none rounded cursor-pointer font-semibold transition-colors duration-200`} disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
              {error && <div className="text-[#ff6a88] text-center">{error}</div>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}