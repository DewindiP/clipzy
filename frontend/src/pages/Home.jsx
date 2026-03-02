import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await API.get("/videos");
        setVideos(data);
      } catch (err) {
        setVideos([]);
      }
    };
    fetchVideos();
  }, []);

  // Scroll handler for vertical swipe
  
  const isScrolling = useRef(false);
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current || videos.length === 0) return;

      if (e.deltaY > 0 && current < videos.length - 1) {
        setCurrent((c) => c + 1);
      } else if (e.deltaY < 0 && current > 0) {
        setCurrent((c) => c - 1);
      }

      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 200);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current, videos.length]);

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main
        className={`flex flex-1 flex-col items-center justify-center overflow-hidden ${theme === "dark" ? "bg-[#181f2a]" : "bg-white"}`}
      >
        <h1
          className={`font-extrabold text-center text-[2.5rem] tracking-[2px] mt-6 mb-1 ${theme === "dark" ? "text-white" : "text-[#222]"} ${theme === "dark" ? "drop-shadow-[0_2px_8px_#000]" : ""}`}
        >
          CLIPZY
        </h1>
        <div
          className="w-full max-w-[420px] m-auto pt-0 h-[80vh] flex items-center justify-center"
        >
          {videos.length === 0 ? (
            <p className={`text-center ${theme === "dark" ? "text-[#888]" : "text-[#666]"}`}>No videos yet.</p>
          ) : (
            <VideoCard video={videos[current]} />
          )}
        </div>
      </main>
    </div>
  );
}