import * as React from "react";
import { FaChevronDown, FaChevronUp, FaSpotify, FaPlay, FaPause, FaCheck, FaCopy } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { UpdateAdminCatalogApi } from "../../api/catalogs";
import ConfirmationButton from "../../ui/ConfirmationButton";
import EditReleasePopUp from "./PopUp/EditReleasePopUp";
import { MdEdit } from "react-icons/md";

// BACKEND NOTE: Expanded row data and Audio Player will be fully wired by backend.
// BACKEND NOTE: Artwork and Lyrics data to be supplied.

interface AdminAudioListRowProps {
  catalog: any;
  index: number;
  currentPage: number;
  PAGE_SIZE: number;
}

export default function AdminAudioListRow({
  catalog,
  index,
  currentPage,
  PAGE_SIZE,
}: AdminAudioListRowProps) {
  const [isOpen, setIsOpen] = React.useState(index === 2); // Open 3rd row by default as per mockup example (approx)
  const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

  const { mutate: UpdateAdminCatalog } = UpdateAdminCatalogApi();
  const [copied, setCopied] = React.useState(false);

  const handleCopyLyrics = () => {
    const lyricsText = catalog.Lyrics || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.";
    navigator.clipboard.writeText(lyricsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mockup shows Approve/Reject/Takedown buttons in the Action column
  const ActionButtons = () => (
    <div className="flex flex-col gap-1 items-start" onClick={(e) => e.stopPropagation()}>
      <ConfirmationButton
        onConfirm={() =>
          UpdateAdminCatalog({
            users_id: catalog.users_id,
            releseInfo_id: catalog.releseInfo_id,
            Status: 4,
          })
        }
        title="Approve Release?"
      >
        <button className="bg-green-700 hover:bg-green-800 text-white typo-btn-action normal-case w-20">
          Approve
        </button>
      </ConfirmationButton>

      <ConfirmationButton
        onConfirm={() =>
          UpdateAdminCatalog({
            users_id: catalog.users_id,
            releseInfo_id: catalog.releseInfo_id,
            Status: 2,
          })
        }
        title="Reject Release?"
      >
        <button className="bg-red-700 hover:bg-red-800 text-white typo-btn-action normal-case w-20">
          Reject
        </button>
      </ConfirmationButton>

      <ConfirmationButton
        onConfirm={() =>
          UpdateAdminCatalog({
            users_id: catalog.users_id,
            releseInfo_id: catalog.releseInfo_id,
            Status: 5,
          })
        }
        title="Takedown Release?"
      >
        <button className="bg-red-900 hover:bg-red-950 text-white typo-btn-action normal-case w-20">
          Takedown
        </button>
      </ConfirmationButton>
    </div>
  );

  return (
    <>
      <tr
        className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${isOpen ? '' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">{actualIndex}</td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top max-w-[150px] truncate" title={catalog.ReleaseTitle}>
          {catalog.ReleaseTitle || "Song Name"}
        </td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">{catalog.users_id || 2}</td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">--</td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">
          {catalog.userData?.[0]?.fname} {catalog.userData?.[0]?.lname || "Ram Kumar Singh"}
        </td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">{catalog.userData?.[0]?.email || "User@gmail.com"}</td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">{catalog.LabelName || "Label Name"}</td>
        <td className="px-3 py-3 typo-table-cell text-center text-gray-700 align-top">{catalog.songInfo?.length || 5}</td>
        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top">{catalog.ReleaseDate || "15/02/2025"}</td>
        
        {/* Action Column with Stacked Buttons */}
        <td className="px-3 py-2 align-top">
          <ActionButtons />
        </td>

        <td className="px-3 py-3 typo-table-cell text-gray-700 align-top whitespace-nowrap">
          {catalog.createdAt || "14/02/2025"}<br/>
          <span className="text-gray-500 text-[10px]">10:33 PM</span>
        </td>

         <td className="px-3 py-3 align-top">
             {isOpen ? <FaChevronUp className="text-gray-400" size={10} /> : <FaChevronDown className="text-gray-400" size={10} />}
         </td>
      </tr>

      {/* Expanded Row Content */}
      {isOpen && (
        <tr>
          <td colSpan={12} className="p-0 border-b border-gray-200">
            <div className="bg-[#f3f0fa] px-3 py-3 flex gap-2 text-[10px]">
              
              {/* Left Section: Artwork and General Info */}
              <div className="flex gap-2 w-1/2 border-r border-gray-300 pr-2">
                 {/* Artwork Placeholder */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                        {catalog.ImageDocument ? (
                             <img src={`https://api.fmdigitalofficial.com/${catalog.ImageDocument}`} className="w-full h-full object-cover rounded" alt="Artwork" />
                        ) : (
                            <span className="text-gray-400 text-[9px] text-center">Artwork</span>
                         )}
                    </div>
                </div>

                {/* Info Columns */}
                <div className="flex-1 grid grid-cols-[80px_1fr] gap-x-1 gap-y-0">
                    <div className="text-gray-500">Release Type:</div>
                    <div className="text-gray-800 font-medium">{catalog.ReleaseType || "Single"}</div>

                    <div className="text-gray-500">Release Title:</div>
                    <div className="text-gray-800 font-medium">{catalog.ReleaseTitle || "Song Name"}</div>

                    <div className="col-span-2 h-0.5"></div>

                    <div className="text-gray-500">Primary Artist:</div>
                    <div className="text-gray-800 font-medium">{catalog.PrimaryArtist || "Ramesh Hosanna Ministries"}</div>

                    <div className="text-gray-500 flex items-center gap-1">
                        Spotify: <FaSpotify className="text-green-500" size={10} />
                    </div>
                    <div className="text-gray-500 flex items-center gap-1">
                        Apple: <SiApplemusic className="text-red-500" size={10} />
                    </div>

                    <div className="col-span-2 h-0.5"></div>
                    
                    <div className="text-gray-500">Feat. Artist:</div>
                    <div className="text-gray-800 font-medium">{catalog.FeaturingArtist || "Pastor Ramesh"}</div>
                    
                    <div className="text-gray-500 flex items-center gap-1">
                        Spotify: <FaSpotify className="text-green-500" size={10} />
                    </div>
                     <div className="text-gray-500 flex items-center gap-1">
                        Apple: <SiApplemusic className="text-red-500" size={10} />
                    </div>
                </div>

                 {/* Second Column of Info */}
                <div className="flex-1 grid grid-cols-[60px_1fr] gap-x-1 gap-y-0">
                    <div className="text-gray-500">Genre:</div>
                    <div className="text-gray-800 font-medium">{catalog.Genre || "Devotional"}</div>

                    <div className="text-gray-500">Sub Genre:</div>
                    <div className="text-gray-800 font-medium">{catalog.SubGenre || "Telugu"}</div>

                    <div className="text-gray-500">PLine:</div>
                    <div className="text-gray-800 font-medium">{catalog.PLine || "Fm Digital"}</div>

                    <div className="text-gray-500">CLine:</div>
                    <div className="text-gray-800 font-medium leading-tight">
                         {catalog.CLine || "FM Digital Official on behalf of (Ramesh Hosanna Ministries)"}
                    </div>

                    <div className="text-gray-500">UPC/EAN:</div>
                    <div className="text-gray-800 font-medium">{catalog.UPCEAN || "0123456789123"}</div>

                    <div className="text-gray-500">Cat No.:</div>
                    <div className="text-gray-800 font-medium">{catalog.cat_id || "CAT1001"}</div>

                    <div className="col-span-2 mt-1 flex justify-end gap-1">
                         <button className="bg-white border border-gray-300 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 hover:bg-gray-50 normal-case">
                            Edit <MdEdit size={10} />
                         </button>
                         <button className="bg-white border border-gray-300 px-1.5 py-0.5 rounded text-[10px] hover:bg-gray-50 normal-case">
                            Download
                         </button>
                    </div>
                </div>
              </div>


              {/* Right Section: Song Details & Player */}
              <div className="w-1/2 pl-0.5">
                 <h3 className="text-[11px] font-semibold text-gray-800 mb-1">{catalog.songInfo?.[0]?.Title || "Song Title"}</h3>
                 
                 <div className="bg-white rounded-lg p-2 mb-2 border border-gray-100 shadow-sm">
                     <div className="flex items-center gap-2">
                         <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-gray-600">
                             <FaPlay size={12} className="ml-0.5" />
                         </button>
                         <div className="flex-1">
                             <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                 <span>00:00</span>
                                 <span>03:40</span>
                             </div>
                             <div className="h-1 bg-gray-200 rounded-full w-full relative">
                                  <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gray-400 rounded-full"></div>
                                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
                             </div>
                         </div>
                         <div className="text-gray-400">
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2V15H6L11 19V5Z"></path><path d="M19.07 4.93L15.54 8.46"></path></svg>
                         </div>
                     </div>
                 </div>

                 <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                     <div className="space-y-0">
                         <div className="grid grid-cols-[80px_1fr] gap-x-1">
                             <span className="text-gray-500">Track Version:</span>
                             <span className="text-gray-800">Original</span>
                         </div>
                         <div className="grid grid-cols-[80px_1fr] gap-x-1">
                             <span className="text-gray-500">Instrumental:</span>
                             <span className="text-gray-800">No</span>
                         </div>
                         <div className="grid grid-cols-[80px_1fr] gap-x-1">
                             <span className="text-gray-500">Song Title:</span>
                             <span className="text-gray-800 truncate max-w-[120px]">{catalog.songInfo?.[0]?.Title || "Song Title"}</span>
                         </div>
                         <div className="grid grid-cols-[80px_1fr] gap-x-1">
                             <span className="text-gray-500">Version/Sub:</span>
                             <span className="text-gray-800">--</span>
                         </div>
                         <div className="grid grid-cols-[80px_1fr] gap-x-1">
                             <span className="text-gray-500">Primary Artist:</span>
                             <span className="text-gray-800 truncate max-w-[120px]">Ramesh H...</span>
                         </div>
                         <div className="grid grid-cols-[80px_1fr] gap-x-1">
                             <span className="text-gray-500">Feat. Artist:</span>
                             <span className="text-gray-800 truncate max-w-[120px]">Ramesh H...</span>
                         </div>
                     </div>

                     <div className="space-y-0">
                         <div className="grid grid-cols-[70px_1fr] gap-x-1">
                             <span className="text-gray-500">Price Tier:</span>
                             <span className="text-gray-800 font-medium">Digital 45 ($1.49)</span>
                         </div>
                         <div className="grid grid-cols-[70px_1fr] gap-x-1">
                             <span className="text-gray-500">Explicit:</span>
                             <span className="text-gray-800">No</span>
                         </div>
                         <div className="grid grid-cols-[70px_1fr] gap-x-1">
                             <span className="text-gray-500">Title Lang:</span>
                             <span className="text-gray-800">Telugu</span>
                         </div>
                         <div className="grid grid-cols-[70px_1fr] gap-x-1">
                             <span className="text-gray-500">Lyrics Lang:</span>
                             <span className="text-gray-800">Telugu</span>
                         </div>
                         
                         <div className="mt-0.5 flex items-center gap-1.5">
                             <span className="text-gray-500">Lyrics:</span>
                             <button 
                               onClick={handleCopyLyrics}
                               className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
                             >
                               {copied ? (
                                   <><FaCheck size={8} /><span className="text-[9px]">Copied!</span></>
                               ) : (
                                   <><FaCopy size={8} /><span className="text-[9px]">Copy lyrics</span></>
                               )}
                             </button>
                         </div>
                         <p className="text-[9px] text-gray-400 leading-tight line-clamp-2">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                         </p>
                     </div>
                 </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}
