import * as React from "react";
import { FaYoutube, FaCopy } from "react-icons/fa6";
import { UpdateAdminCatalogApi } from "../../api/catalogs";
import ConfirmationButton from "../../ui/ConfirmationButton";
import { MdEdit } from "react-icons/md";
import RejectionModal from "./RejectionModal";

// BACKEND NOTE: Expanded row data will be supplied later by backend.

interface AdminVideoListRowProps {
  catalog: any;
  index: number;
  currentPage: number;
  PAGE_SIZE: number;
}

export default function AdminVideoListRow({
  catalog,
  index,
  currentPage,
  PAGE_SIZE,
}: AdminVideoListRowProps) {
  const [isOpen, setIsOpen] = React.useState(index === 1); // Second row expanded by default
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

  const { mutate: UpdateAdminCatalog, isLoading: isUpdating } = UpdateAdminCatalogApi();

  const getStatusDisplay = (status: number) => {
    const statusMap: Record<number, { text: string; color: string }> = {
      0: { text: "Draft", color: "text-blue-600" },
      1: { text: "Pending", color: "text-orange-500" },
      2: { text: "Rejected", color: "text-red-600" },
      3: { text: "Corrections", color: "text-orange-600" },
      4: { text: "Approved", color: "text-green-600" },
      5: { text: "Takedown", color: "text-red-800" },
    };
    return statusMap[status] || { text: "--", color: "text-gray-500" };
  };

  const statusDisplay = getStatusDisplay(catalog.Status);

  const handleConfirmReject = (reason: string) => {
    UpdateAdminCatalog(
      {
        users_id: catalog.users_id,
        releseInfo_id: catalog.releseInfo_id,
        Status: 2,
        RejectReason: reason,
      },
      {
        onSettled: () => {
          setIsRejectModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      {/* Main Row */}
      <tr
        className="hover:bg-gray-50 cursor-pointer border-b border-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="px-3 py-2 typo-table-cell text-gray-700">{actualIndex}</td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">{catalog.ReleaseTitle || "--"}</td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">{catalog.users_id || "--"}</td>
        <td className={`px-3 py-2 typo-table-cell-strong ${statusDisplay.color}`}>{statusDisplay.text}</td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">
          {catalog.userData?.[0] ? `${catalog.userData[0].fname} ${catalog.userData[0].lname}` : "--"}
        </td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">{catalog.userData?.[0]?.email || "--"}</td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">{catalog.LabelName || "--"}</td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">{catalog.songInfo?.length || "--"}</td>
        <td className="px-3 py-2 typo-table-cell text-gray-700">{catalog.ReleaseDate || "--"}</td>

        {/* Action Buttons - Stacked as per density requirement */}
        <td className="px-3 py-2">
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

            <button 
              onClick={() => setIsRejectModalOpen(true)}
              className="bg-red-700 hover:bg-red-800 text-white typo-btn-action normal-case w-20"
            >
              Reject
            </button>

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
        </td>

        {/* Created At */}
        <td className="px-3 py-2 typo-table-cell text-gray-700">
             {catalog.createdAt || "14/02/2025"}<br/>
             <span className="text-gray-500 text-[10px]">10:33 PM</span>
        </td>
      </tr>

      {/* Expanded Row - Exact mockup: lavender bg, LANDSCAPE thumbnail, fields in columns */}
      {isOpen && (
        <tr>
          <td colSpan={11} className="p-0 border-b border-gray-200">
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 px-3 py-3 border-b border-gray-200 flex gap-4 text-[10px]">
                
                {/* Thumbnail Placeholder - Landscape Rectangle */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-20 border-2 border-gray-400 rounded-lg flex items-center justify-center bg-transparent">
                    {catalog.ImageDocument ? (
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={`https://api.fmdigitalofficial.com/${catalog.ImageDocument}`}
                        alt="Thumbnail"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center scale-75">
                         {/* Placeholder Icon similar to mockup */}
                        <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                          <path d="M21 15l-5-5L5 21" strokeWidth="2"/>
                        </svg>
                        {/* Play bar at bottom of icon */}
                         <div className="w-8 h-1 bg-gray-600 rounded-full mt-1"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Header: Release Name / Artist Name */}
                    <div className="mb-2">
                        <div className="font-semibold text-gray-800 text-[11px]">Release Name</div>
                        <div className="text-gray-500">Artist Name</div>
                    </div>

                    {/* Columns Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Column 1 */}
                        <div className="space-y-0.5">
                             <div className="grid grid-cols-[90px_1fr]">
                                 <span className="text-gray-500">Audio Title:</span>
                                 <span className="text-gray-800 font-medium">Track Name</span>
                             </div>
                             <div className="grid grid-cols-[90px_1fr] items-center">
                                 <span className="text-gray-500">Download:</span>
                                 <button className="text-gray-600 border border-gray-300 bg-white rounded px-1.5 py-0.5 text-[10px] w-fit hover:bg-gray-50 normal-case">Download</button>
                             </div>
                             <div className="grid grid-cols-[90px_1fr]">
                                 <span className="text-gray-500">Language:</span>
                                 <span className="text-gray-800 font-medium">Hindi</span>
                             </div>
                             <div className="grid grid-cols-[90px_1fr]">
                                 <span className="text-gray-500">Release date:</span>
                                 <span className="text-gray-800 font-medium">20/12/2025</span>
                             </div>
                             <div className="grid grid-cols-[90px_1fr] items-center">
                                 <span className="text-gray-500 truncate mr-1">Video URL:</span>
                                 <div className="flex gap-2 items-center">
                                     <FaYoutube className="text-black w-3.5 h-3.5" />
                                     <FaCopy className="text-black w-2.5 h-2.5 cursor-pointer" />
                                 </div>
                             </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-0.5">
                            <div className="grid grid-cols-[80px_1fr]">
                                 <span className="text-gray-500">Track Name:</span>
                                 <span className="text-gray-800 font-medium whitespace-nowrap">--</span>
                             </div>
                             <div className="grid grid-cols-[80px_1fr]">
                                 <span className="text-gray-500">Video ISRC:</span>
                                 <span className="text-gray-800 font-medium whitespace-nowrap text-[9px]">{catalog.songInfo?.[0]?.ISSRC || "IND-458-2014"}</span>
                             </div>
                             <div className="grid grid-cols-[80px_1fr]">
                                 <span className="text-gray-500">Actor Name:</span>
                                 <span className="text-gray-800 font-medium">{catalog.ActorName || "Sunil"}</span>
                             </div>
                             <div className="grid grid-cols-[80px_1fr]">
                                 <span className="text-gray-500">Actress Name:</span>
                                 <span className="text-gray-800 font-medium">{catalog.ActressName || "Sonali"}</span>
                             </div>
                        </div>

                         {/* Column 3 */}
                        <div className="space-y-0.5 relative">
                            <div className="grid grid-cols-[70px_1fr]">
                                 <span className="text-gray-500">Video UPC:</span>
                                 <span className="text-gray-800 font-medium whitespace-nowrap">01247652369</span>
                             </div>
                             
                             {/* Edit Button at bottom right of this section */}
                             <div className="absolute bottom-0 right-0">
                                 <button className="bg-white border border-gray-300 text-gray-600 px-1.5 py-0.5 rounded shadow-sm text-[10px] flex items-center gap-1 hover:bg-gray-50 normal-case">
                                     Edit <MdEdit size={10} />
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
          </td>
        </tr>
      )}

      {/* Rejection Modal */}
      <RejectionModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleConfirmReject}
        isLoading={isUpdating}
      />
    </>
  );
}
