// BACKEND NOTE: Page title can later be derived from backend-driven route config if needed.

import * as React from "react";
import { useNavigate } from 'react-router-dom';
import AppHeader from '../SharedLayout/AppHeader';

// BACKEND NOTE: This route should be protected. Backend should verify user role (Artist/Admin) 
// before allowing access to release creation flows.

// BACKEND / ANALYTICS NOTE: Track which release type is selected (audio vs video) 
// for funnel analysis.

export default function MusicReleaseCards() {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-white flex flex-col">
      <AppHeader title="Create Release" />

      {/* Cards Section */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="flex flex-wrap gap-24 justify-center max-w-12xl">
          {/* Audio Release Card */}
          <div
            className="w-80 h-[28rem] relative overflow-hidden shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 rounded-3xl"
            onClick={() => navigate('/ReleaseInfo/AudioRelease')}
          >
            <img src="/create release/Create Audio card.png" alt="Audio Release" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Video Release Card */}
          <div
            className="w-80 h-[28rem] relative overflow-hidden shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 rounded-3xl"
            onClick={() => navigate('/ReleaseInfo/VideoRelease')}
          >
            <img src="/create release/Create video card.png" alt="Video Release" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}