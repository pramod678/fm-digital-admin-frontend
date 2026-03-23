// BACKEND NOTE: Page title can later be derived from backend-driven route config if needed.

// BACKEND NOTE: This route should be protected. Backend should verify user role (Artist/Admin) 
// before allowing access to release creation flows.

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import AppHeader from "../SharedLayout/AppHeader";

// BACKEND / ANALYTICS NOTE: Track which release type is selected (audio vs video) 
// for funnel analysis.

export default function CreateReleaseChoice() {
  const navigate = useNavigate();

  const handleAudioReleaseClick = () => {
    // ANALYTICS: Track "Audio Release" selection
    navigate("/ReleaseInfo/AudioRelease");
  };

  const handleVideoReleaseClick = () => {
    // ANALYTICS: Track "Video Release" selection
    navigate("/ReleaseInfo/VideoRelease");
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <AppHeader title="Create Release" />

      {/* Main Content - Centered Cards */}
      <div className="flex-1 flex items-center justify-center px-8 py-8">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-center max-w-7xl">
          
          {/* Audio Release Card */}
          <div
            onClick={handleAudioReleaseClick}
            className="w-[340px] h-[480px] relative cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl rounded-3xl overflow-hidden"
          >
            <img src="/create release/Create Audio card.png" alt="Audio Release" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Video Release Card */}
          <div
            onClick={handleVideoReleaseClick}
            className="w-[340px] h-[480px] relative cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl rounded-3xl overflow-hidden"
          >
            <img src="/create release/Create video card.png" alt="Video Release" className="absolute inset-0 w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </div>
  );
}
