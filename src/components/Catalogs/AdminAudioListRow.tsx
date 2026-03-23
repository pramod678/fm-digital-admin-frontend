import * as React from "react";
import { FaChevronDown, FaChevronUp, FaSpotify, FaPlay, FaPause, FaCheck } from "react-icons/fa6";
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
        <button className="bg-green-700 hover:bg-green-800 text-white typo-btn-action normal-case">
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
        <button className="bg-red-700 hover:bg-red-800 text-white typo-btn-action normal-case">
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
        <button className="bg-red-900 hover:bg-red-950 text-white typo-btn-action normal-case">
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
            <div className="bg-[#f3f0fa] px-6 py-6 flex gap-8">
              
              {/* Left Section: Artwork and General Info */}
              <div className="flex gap-6 w-1/2 border-r border-gray-300 pr-6">
                 {/* Artwork Placeholder */}
                <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                        {catalog.ImageDocument ? (
                             <img src={`https://api.fmdigitalofficial.com/${catalog.ImageDocument}`} className="w-full h-full object-cover rounded" alt="Artwork" />
                        ) : (
                            <span className="text-gray-400 text-xs text-center">Artwork</span>
                         )}
                    </div>
                </div>

                {/* Info Columns */}
                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 typo-table-cell">
                    <div className="col-span-1 text-gray-500">Release Type:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.ReleaseType || "Single"}</div>

                    <div className="col-span-1 text-gray-500">Release Title:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.ReleaseTitle || "Udhayamuna Santhosamu Kalugunu"}</div>

                    <div className="col-span-2 h-2"></div> {/* Spacer */}

                    <div className="col-span-1 text-gray-500">Primary Artist:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.PrimaryArtist || "Ramesh Hosanna Ministries"}</div>

                    <div className="col-span-1 text-gray-500 flex items-center gap-1">
                        Spotify: <FaSpotify className="text-green-500" />
                    </div>
                    <div className="col-span-1 text-gray-500 flex items-center gap-1">
                        Apple music: <SiApplemusic className="text-red-500" />
                    </div>

                    <div className="col-span-2 h-1"></div> {/* Spacer */}
                    
                    <div className="col-span-1 text-gray-500">FeaturingArtist:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.FeaturingArtist || "Pastor Ramesh"}</div>
                    
                    <div className="col-span-1 text-gray-500 flex items-center gap-1">
                        Spotify: <FaSpotify className="text-green-500" />
                    </div>
                     <div className="col-span-1 text-gray-500 flex items-center gap-1">
                        Apple music: <SiApplemusic className="text-red-500" />
                    </div>
                </div>

                 {/* Second Column of Info */}
                <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1 typo-table-cell">
                    <div className="col-span-1 text-gray-500">Genre:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.Genre || "Devotional"}</div>

                    <div className="col-span-1 text-gray-500">Sub Genre:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.SubGenre || "Telugu"}</div>

                    <div className="col-span-1 text-gray-500">PLine:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.PLine || "Fm Digital"}</div>

                    <div className="col-span-1 text-gray-500">CLine:</div>
                    <div className="col-span-1 text-gray-800 font-medium leading-tight">
                         {catalog.CLine || "FM Digital Official on behalf of (Ramesh Hosanna Ministries)"}
                    </div>

                    <div className="col-span-1 text-gray-500">UPC/EAN:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.UPCEAN || "0123456789123"}</div>

                    <div className="col-span-1 text-gray-500">Cat No.:</div>
                    <div className="col-span-1 text-gray-800 font-medium">{catalog.cat_id || "CAT1001"}</div>

                    <div className="col-span-2 mt-4 flex justify-end gap-2">
                         <button className="bg-white border border-gray-300 px-2 py-1 rounded typo-btn-action flex items-center gap-1 hover:bg-gray-50 normal-case">
                            Edit <MdEdit size={12} />
                         </button>
                         <button className="bg-white border border-gray-300 px-2 py-1 rounded typo-btn-action hover:bg-gray-50 normal-case">
                            Download
                         </button>
                    </div>
                </div>
              </div>


              {/* Right Section: Song Details & Player */}
              <div className="w-1/2 pl-2">
                 <h3 className="typo-table-cell-strong text-gray-800 mb-3">{catalog.songInfo?.[0]?.Title || "Udhayamuna Santhosamu Kalugunu"}</h3>
                 
                 <div className="bg-white rounded-lg p-3 mb-3 border border-gray-100 shadow-sm relative">
                     {/* Fake Player Visual */}
                     <div className="flex items-center gap-3">
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

                 <div className="grid grid-cols-2 gap-x-8 gap-y-2 typo-table-cell">
                     <div className="space-y-1">
                         <div className="flex justify-between"><span className="text-gray-500">Track Version:</span> <span className="text-gray-800">Original</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Instrumental:</span> <span className="text-gray-800">No</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Song Title:</span> <span className="text-gray-800 truncate max-w-[100px]">{catalog.songInfo?.[0]?.Title || "Udhayamuna..."}</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Version/SubTitle:</span> <span className="text-gray-800">--</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Primary Artist:</span> <span className="text-gray-800 truncate max-w-[100px]">Ramesh Hosanna...</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Featuring Artist:</span> <span className="text-gray-800 truncate max-w-[100px]">Ramesh Hosanna...</span></div>
                     </div>

                     <div className="space-y-1">
                         <div className="flex justify-between"><span className="text-gray-500">Price Tier:</span> <span className="text-gray-800">Digital 45 ( $1.49 )</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Explicit Version:</span> <span className="text-gray-800">No</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Track Title Language:</span> <span className="text-gray-800">Telugu</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">Lyrics Language:</span> <span className="text-gray-800">Telugu</span></div>
                         
                         <div className="mt-2 text-gray-500">Lyrics:</div>
                         <div className="flex items-center gap-2 mt-0.5">
                             <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                             <span className="text-gray-600 text-[10px]">Copy the lyrics</span>
                         </div>
                         <p className="text-[10px] text-gray-400 leading-relaxed mt-1 line-clamp-2">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
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
