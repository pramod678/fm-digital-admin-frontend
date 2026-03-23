import * as React from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { X, Check, ArrowLeft, Info } from 'lucide-react';
import { GetReleaseInfoByIdApi, GetSongsApi } from "../../../api/releaseInfo";
import { BounceLoader } from "react-spinners";
import AppHeader from "../../SharedLayout/AppHeader";

const UserRejectedSong = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const stateData = location.state;
  
  // Fetch release info by ID (ONLY if not provided in state)
  const { data: releaseInfoData, isLoading: isLoadingRelease } = GetReleaseInfoByIdApi(id);
  // Fetch songs for this release (ONLY if not provided in state)
  const { data: songsData, isLoading: isLoadingSongs } = GetSongsApi(id);

  // Prioritize state data (for dummy data flow), else use API data
  const releaseData = stateData || releaseInfoData?.data?.data || releaseInfoData?.data?.result;
  
  // For dummy data, tracks might be missing or mocked. Let's mock a track if missing.
  const apiTracks = songsData?.data?.data || songsData?.data?.result || [];
  const tracksData = stateData ? 
      (stateData.tracksArray || [{Title: stateData.Title || "Track 1", ArtistName: stateData.ArtistName, Genre: stateData.Genre, ISRC: "IN-XYZ-12345", Status: stateData.Status}]) 
      : apiTracks;

  // Status: 4 = Approved, 2 = Rejected
  const status = releaseData?.Status;
  const isApproved = status === 4;
  const isRejected = status === 2;
  
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
    } catch {
      return dateStr;
    }
  };

  // Skip loading check if we have state data
  if (!stateData && (isLoadingRelease || isLoadingSongs)) {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <BounceLoader size={60} color={"#000000"} />
        </div>
    );
  }

  if (!releaseData) {
      return (
          <div className="flex flex-col justify-center items-center h-screen bg-white gap-4">
              <p className="text-gray-600">Release not found.</p>
              <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Go Back</button>
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
        <AppHeader title="Audio Catalog Details" />
        
        <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
            
            {/* Navigation */}
            <button 
                onClick={() => navigate('/user/catalog/audio')}
                className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors self-start"
            >
                <ArrowLeft size={18} />
                <span className="typo-btn-action normal-case">Back to Audio Catalog</span>
            </button>

            {/* Status Banners */}
            {isRejected && (
                <div className="w-full bg-red-100 rounded-lg border border-red-200 flex flex-col md:flex-row items-start md:items-center p-4 gap-4 md:gap-6">
                    <div className="flex items-center gap-2 text-red-600 min-w-fit">
                        <X size={20} className="stroke-[3]" />
                        <span className="typo-page-title">Rejected</span>
                    </div>
                    
                    <div className="hidden md:block w-px h-8 bg-red-300"></div>
                    
                    <div className="flex gap-2 text-red-800 typo-table-cell">
                        <span className="font-semibold">Note:</span>
                        <span>{releaseData.RejectReason || "No specific reason provided."}</span>
                    </div>
                </div>
            )}

            {isApproved && (
                <div className="w-full bg-green-100 rounded-lg border border-green-200 flex items-center p-4 gap-4">
                     <div className="flex items-center gap-2 text-green-700">
                        <Check size={20} className="stroke-[3]" />
                        <span className="typo-page-title">Approved</span>
                    </div>
                </div>
            )}


            {/* Main Content: Single Card Layout for Artwork + Metadata */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                {/* Artwork Section */}
                <div className="w-full md:w-80 h-80 flex-shrink-0 bg-gray-100 relative">
                     {releaseData.ImageDocument ? (
                         <img 
                            src={`https://api.fmdigitalofficial.com/${releaseData.ImageDocument}`} 
                            alt="Album Artwork" 
                            className="w-full h-full object-cover"
                         />
                     ) : (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                             <span className="text-4xl">🎵</span>
                             <span className="text-sm font-medium">No Artwork</span>
                         </div>
                     )}
                </div>

                {/* Metadata Grid */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="typo-page-title text-gray-900 mb-1">{releaseData.Title}</h1>
                            <p className="text-gray-500 typo-table-cell-strong">{releaseData.ArtistName}</p>
                        </div>
                        {/* Status chip for non-approved/rejected if needed, or just hide it */}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col typo-table-cell">
                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Label</span>
                        <span className="font-semibold text-gray-800">{releaseData.Label || '-'}</span>
                    </div>
                    <div className="flex flex-col typo-table-cell">
                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Release Date</span>
                        <span className="font-semibold text-gray-800">{formatDate(releaseData.ReleaseDate)}</span>
                    </div>
                    <div className="flex flex-col typo-table-cell">
                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Genre</span>
                        <span className="font-semibold text-gray-800">{releaseData.Genre || '-'}</span>
                    </div>
                    <div className="flex flex-col typo-table-cell">
                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Language</span>
                        <span className="font-semibold text-gray-800">{releaseData.Language || 'English'}</span>
                    </div>
                    <div className="flex flex-col typo-table-cell">
                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">UPC/EAN</span>
                        <span className="font-medium text-gray-800 font-mono">{releaseData.UPC || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col typo-table-cell">
                           <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">P Line</span>
                           <span className="font-semibold text-gray-800">{releaseData.PLine || '-'}</span>
                    </div>
                    <div className="flex flex-col typo-table-cell">
                           <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">C Line</span>
                           <span className="font-semibold text-gray-800">{releaseData.CLine || '-'}</span>
                    </div>
                    </div>
                </div>
            </div>

            {/* Tracks Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="typo-page-title text-gray-900">Tracks</h2>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">{tracksData.length}</span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead className="bg-gray-50 typo-table-head border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 w-12">#</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Genre</th>
                                <th className="px-6 py-4">Cat Number</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Major Platforms</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tracksData.map((track: any, idx: number) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 typo-table-cell-strong text-gray-400">{idx + 1}</td>
                                    <td className="px-6 py-4 typo-table-cell">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{track.Title}</span>
                                            <span className="text-gray-500">{track.ArtistName || releaseData.ArtistName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 typo-table-cell text-gray-600">{track.Genre || releaseData.Genre || '-'}</td>
                                    <td className="px-6 py-4 typo-table-cell font-mono text-gray-500">{track.KB_CatNumber || track.ISRC || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded border typo-btn-action normal-case ${
                                            isApproved 
                                            ? 'border-green-500 text-green-500 bg-white' 
                                            : isRejected 
                                            ? 'border-red-500 text-red-500 bg-white' 
                                            : 'border-yellow-500 text-yellow-500 bg-white'
                                        }`}>
                                            {isApproved ? 'Approved' : isRejected ? 'Rejected' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <img src="/Elements/Spotify.svg" alt="Spotify" className="w-5 h-5" title="Spotify" />
                                                <img src="/Elements/Apple music.svg" alt="Apple Music" className="w-5 h-5" title="Apple Music" />
                                                <img src="/Elements/YT music.svg" alt="YouTube Music" className="w-5 h-5" title="YouTube Music" />
                                                <img src="/Elements/Amazon music.svg" alt="Amazon Music" className="w-5 h-5" title="Amazon Music" />
                                                <img src="/Elements/Soundcloud.svg" alt="SoundCloud" className="w-5 h-5" title="SoundCloud" />
                                            </div>
                                            <span className="text-[10px] text-gray-400 leading-tight max-w-[200px]">
                                                Some stores don't provide direct links. To find your album on a specific platform, simply visit the store and search for your album manually.
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
  );
};

export default UserRejectedSong;

