// BACKEND NOTE: This component handles video release creation. All form data should be
// submitted to a video release creation endpoint. Required field validation should be
// performed both client-side and server-side.

import * as React from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarClock } from "lucide-react";
import AppHeader from "../SharedLayout/AppHeader";
import MusicVideoGuidelinesModal from "./MusicVideoGuidelinesModal";

export default function VideoRelease() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(null);
  const [releaseDate, setReleaseDate] = React.useState<Date | null>(null);
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  // Form field states
  const [formData, setFormData] = React.useState({
    selectRelease: "",
    selectAudio: "",
    downloadLink: "",
    language: "",
    videoUrl: "",
    videoUpc: "",
    videoIsrc: "",
    actorName: "",
    actressName: "",
  });

  // BACKEND NOTE: Platforms list should be dynamic later. Store selected platforms as array of platform IDs.
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    platforms.flat().forEach((p) => {
      initial[p.id] = true; // All checked by default
    });
    return initial;
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // BACKEND NOTE: Thumbnail upload endpoint to be implemented. Expected image size 1920x1080. Validate dimensions server-side.
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platformId]: !prev[platformId],
    }));
  };

  // BACKEND NOTE: Submission endpoint should validate required fields, platform selection, and terms acceptance.
  const handleSubmit = () => {
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    console.log("Form Data:", formData);
    console.log("Release Date:", releaseDate);
    console.log("Selected Platforms:", Object.keys(selectedPlatforms).filter((k) => selectedPlatforms[k]));
    console.log("Thumbnail:", thumbnail);
    // TODO: Submit to backend
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <AppHeader title="Create Video Release" />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Two-column layout: Thumbnail left, Form right */}
        <div className="flex gap-8 max-w-6xl mx-auto">
          {/* Left Column - Thumbnail Upload */}
          <div className="w-48 flex-shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleThumbnailChange}
              className="hidden"
              accept="image/*"
            />
            <div
              className="border border-gray-300 rounded-lg p-4 text-center bg-white cursor-pointer hover:border-gray-400 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded flex items-center justify-center">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover rounded" />
                ) : (
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                )}
              </div>
              <p className="text-gray-600 text-sm font-medium">Upload Video Thumbnail</p>
              <p className="text-gray-400 text-xs mt-1">Size - 1920px x 1080px</p>
            </div>
            <div className="text-center mt-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="text-cyan-500 text-sm hover:underline"
              >
                Music Video Guidelines
              </a>
            </div>
          </div>

          {isModalOpen && <MusicVideoGuidelinesModal onClose={() => setIsModalOpen(false)} />}

          {/* Right Column - Form Fields */}
          <div className="flex-1 space-y-4">
            {/* Row 1: Select Release, Select Audio */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Select Release<span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.selectRelease}
                  onChange={(e) => handleInputChange("selectRelease", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                >
                  <option value="">Select Release</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Select Audio<span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.selectAudio}
                  onChange={(e) => handleInputChange("selectAudio", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                >
                  <option value="">Select Audio</option>
                </select>
              </div>
            </div>

            {/* Row 2: Download link to video, Language */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Download link to video<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Make Sure The File/transfer is Unlocked."
                  value={formData.downloadLink}
                  onChange={(e) => handleInputChange("downloadLink", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Preferred sites: wetransfer, Dropbox, GoogleDrive, Formsmash</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Language<span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                >
                  <option value="">Select Language</option>
                </select>
              </div>
            </div>

            {/* Row 3: Release date, Video URL */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Release date<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarClock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                  <DatePicker
                    selected={releaseDate}
                    onChange={(date: Date | null) => setReleaseDate(date)}
                    placeholderText="Select release date"
                    dateFormat="MM/dd/yyyy"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                    wrapperClassName="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Video URL (If Released Previously)</label>
                <input
                  type="text"
                  placeholder="Paste Content Url if Released Previously"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>
            </div>

            {/* Row 4: Video UPC, Video ISRC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Video UPC</label>
                <input
                  type="text"
                  placeholder="Enter UPC if available (numbers only)"
                  value={formData.videoUpc}
                  onChange={(e) => handleInputChange("videoUpc", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Video ISRC</label>
                <input
                  type="text"
                  placeholder="Enter ISRC if available"
                  value={formData.videoIsrc}
                  onChange={(e) => handleInputChange("videoIsrc", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>
            </div>

            {/* Row 5: Actor Name, Actress Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Actor Name</label>
                <input
                  type="text"
                  placeholder="Separate them using comma (,)"
                  value={formData.actorName}
                  onChange={(e) => handleInputChange("actorName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Actress Name</label>
                <input
                  type="text"
                  placeholder="Separate them using comma (,)"
                  value={formData.actressName}
                  onChange={(e) => handleInputChange("actressName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Platform Section */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-semibold text-gray-800">Video Platform (8+)</h2>
            <input
              type="checkbox"
              checked={Object.values(selectedPlatforms).some(Boolean)}
              onChange={() => {}}
              className="w-4 h-4 accent-pink-500"
            />
          </div>

          {/* Platform Grid - 4 columns */}
          <div className="grid grid-cols-4 gap-x-6 gap-y-1">
            {platforms.map((column, colIndex) => (
              <div key={colIndex} className="space-y-1">
                {column.map((platform) => (
                  <label key={platform.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms[platform.id] || false}
                      onChange={() => handlePlatformToggle(platform.id)}
                      className="w-3.5 h-3.5 accent-pink-500"
                    />
                    <span className="text-xs text-gray-700">{platform.label}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Terms Checkbox */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 accent-pink-500"
            />
            <span className="text-sm text-gray-600">
              I understand and agree to the{" "}
              <a href="#" className="text-cyan-500 underline">
                FM Digital Distribution Terms & Privacy Policy.
              </a>
            </span>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Platform data - exact order from mockup
const platforms = [
  // Column 1
  [
    { id: "vevoCTV", label: "Vevo CTV (Curated)" },
    { id: "comcastVevo", label: "Comcast via Vevo CTV" },
    { id: "fetchVevo", label: "Fetch via Vevo CTV" },
    { id: "netrangeVevo", label: "NetRange via Vevo CTV" },
    { id: "plutoVevo", label: "Pluto TV via Vevo CTV" },
    { id: "rokuVevo", label: "Roku via Vevo CTV" },
    { id: "shawVevo", label: "Shaw TV via Vevo CTV" },
    { id: "vevoCTVCurated", label: "Vevo CTV (Curated)" },
    { id: "vixVevo", label: "VIX via Vevo CTV" },
    { id: "youtubeVevo", label: "YouTube via Vevo CTV" },
    { id: "localNowVevo", label: "Local Now via Vevo CTV" },
  ],
  // Column 2
  [
    { id: "amazonFreevee", label: "Amazon Freevee via Vevo CTV" },
    { id: "amazonFireTV", label: "Amazon Fire TV via Vevo CTV" },
    { id: "coxVevo", label: "COX via Vevo CTV" },
    { id: "foxtelVevo", label: "Foxtel via Vevo CTV" },
    { id: "philoVevoCTV", label: "Philo via Vevo CTV" },
    { id: "rtlaxTV", label: "rtlax TV via Vevo CTV" },
    { id: "philoVevo", label: "Philo via Vevo CTV" },
    { id: "slingVevo", label: "Sling via Vevo CTV" },
    { id: "vewdVevo1", label: "Vewd via Vevo CTV" },
    { id: "vizioVevo", label: "VIZIO via Vevo CTV" },
    { id: "vewdVevo2", label: "Vewd via Vevo CTV" },
  ],
  // Column 3
  [
    { id: "appleTVVevo", label: "Apple TV via Vevo CTV" },
    { id: "huluVevo", label: "Hulu via Vevo CTV" },
    { id: "googleTVVevo", label: "Google TV via Vevo CTV" },
    { id: "plexVevo", label: "Plex via Vevo CTV" },
    { id: "rogersIgnite", label: "Rogers Ignite TV via Vevo CTV" },
    { id: "samsungTVPlus", label: "Samsung TV Plus via Vevo CTV" },
    { id: "tellyVevo", label: "Telly via Vevo CTV" },
    { id: "vidaaVevo1", label: "VIDAA via Vevo CTV" },
    { id: "xurnoPlay", label: "Xumo Play via Vevo CTV" },
    { id: "vidaaVevo2", label: "VIDAA via Vevo CTV" },
    { id: "fity", label: "Fity" },
  ],
  // Column 4
  [
    { id: "boomplay", label: "Boomplay" },
    { id: "spotify", label: "Spotify" },
    { id: "tidal", label: "Tidal" },
    { id: "vi", label: "VI" },
    { id: "xite", label: "Xite" },
    { id: "zingMP3", label: "ZingMP3" },
    { id: "tencent", label: "Tencent" },
    { id: "rokiVideo", label: "ROKI Video" },
    { id: "lineMusic", label: "Line Music" },
    { id: "facebookPMV", label: "Facebook PMV" },
  ],
];