import * as React from "react";
import AdminAudioListRow from "./AdminAudioListRow";
import { GetAdminAllCatalogsApi } from "../../api/catalogs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa6";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import Toggle from "../../ui/Toggle";
import useServiceStatus from "../../hooks/useServiceStatus";
import ServiceStatusModal from "./ServiceStatusModal";

// BACKEND NOTE: API contracts must not be modified.
// BACKEND NOTE: Artwork URLs will be supplied later.
// BACKEND NOTE: Filters, pagination, and expanded data are backend-driven.

const DUMMY_CATALOG_DATA = [
  {
    releseInfo_id: 1,
    users_id: 2,
    ReleaseTitle: "Song Name",
    Status: 1,
    userData: [{ fname: "Ram", lname: "Kumar Singh", email: "User@gmail.com" }],
    LabelName: "Label Name",
    songInfo: [{ Title: "Track 1" }],
    ReleaseDate: "10/10/2025",
    createdAt: "14/02/2025 10:33 PM",
  },
  {
    releseInfo_id: 2,
    users_id: 3,
    ReleaseTitle: "Song Name",
    Status: 1,
    userData: [{ fname: "Sunil", lname: "Kumar", email: "User@gmail.com" }],
    LabelName: "Label Name",
    songInfo: [{ Title: "Track Name" }],
    ReleaseDate: "20/10/2025",
    createdAt: "16/02/2025 10:32 PM",
  },
  {
    releseInfo_id: 3,
    users_id: 3,
    ReleaseTitle: "Song Name",
    Status: 1,
    userData: [{ fname: "K2 Jam", email: "User@gmail.com" }],
    LabelName: "Label Name",
    songInfo: [{ Title: "Audio Title" }],
    ReleaseDate: "18/02/2025",
    createdAt: "14/02/2025 10:33 PM",
  },
];

const STATUS_FILTERS = [
  { label: "Pending", value: 1 },
  { label: "Draft", value: 0 },
  { label: "Approved", value: 4 },
  { label: "Rejected", value: 2 },
  { label: "Takedown", value: 5 },
];

export default function AdminCatalogsAudioList() {
  const navigate = useNavigate();

  const [userId, setUserId] = React.useState("");
  const [statusId, setStatusId] = React.useState<number | "">("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const { isActive, message: serviceMessage, setServiceStatus } = useServiceStatus();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  /*
    BACKEND TODO: Re-enable API when backend is live
    1. Uncomment the API call below
    2. Replace DUMMY_CATALOG_DATA with: setCatalogs(getCatalogs.data.data)
    3. Re-enable the loading spinner in the return() below
    4. Remove DUMMY_CATALOG_DATA constant at the top of this file
  */
  // const {
  //   data: getCatalogs,
  //   isLoading: isLoadingGetCatalogs,
  //   isFetching,
  // } = GetAdminAllCatalogsApi(userId, statusId.toString());

  // FRONTEND-ONLY: Using dummy data (replace with API data when backend is live)
  const [catalogs, setCatalogs] = React.useState<any[]>(DUMMY_CATALOG_DATA);
  const PAGE_SIZE = 6;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filterRecords = (data: any[], term: string) => {
    if (!term) return data;
    return data.filter(
      (row: any) =>
        row?.ReleaseTitle?.toLowerCase().includes(term) ||
        row?.LabelName?.toLowerCase().includes(term) ||
        row?.userData?.[0]?.fname?.toLowerCase().includes(term) ||
        row?.userData?.[0]?.email?.toLowerCase().includes(term)
    );
  };

  const getCurrentPageData = () => {
    const filteredRecords = filterRecords(catalogs, searchTerm);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const slicedRecords = filteredRecords.slice(startIndex, endIndex);
    return { slicedRecords, totalFilteredRecords: filteredRecords.length };
  };

  const { slicedRecords, totalFilteredRecords } = getCurrentPageData();
  const totalPages = Math.ceil(totalFilteredRecords / PAGE_SIZE);

  return (
    <div className="flex flex-col h-full bg-white min-h-screen">
      {/* BACKEND TODO: Re-enable loading spinner when API is connected:
      {(isLoadingGetCatalogs || isFetching) && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/50">
          <BounceLoader size={60} color={"#4F46E5"} />
        </div>
      )}
      */}

      {/* Page Title */}
      <div className="px-4 pt-3 pb-2">
        <h1 className="typo-page-title flex items-center gap-1.5">
          <FaPlay className="w-3 h-3 text-gray-700" /> Audio Catalog
        </h1>
      </div>

      <div className="px-4 space-y-3">
        {/* Summary Strip - Lavender gradient */}
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded px-3 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          
          {/* Left: Go to Video Catalog + count */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/Catalogs")}
              className="bg-green-600 text-white px-3 py-1.5 rounded typo-btn-main hover:bg-green-700 transition-colors text-xs whitespace-nowrap"
            >
              Go to Video Catalog
            </button>
            <span className="text-pink-300 text-2xl font-light">|</span>
            <span className="text-3xl font-bold text-gray-800">5</span>
          </div>

          {/* Right: KPI Pills + Edit + Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 sm:ml-auto">
            <div className="grid grid-cols-2 gap-1">
              <div className="border border-pink-300 bg-white rounded px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <span className="text-gray-600 text-[10px] sm:text-xs">Tickets</span>
                <span className="font-semibold text-pink-600 text-[10px] sm:text-xs">5</span>
              </div>
              <div className="border border-pink-300 bg-white rounded px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <span className="text-gray-600 text-[10px] sm:text-xs">Labels</span>
                <span className="font-semibold text-pink-600 text-[10px] sm:text-xs">3</span>
              </div>
              <div className="border border-pink-300 bg-white rounded px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <span className="text-gray-600 text-[10px] sm:text-xs">UGC</span>
                <span className="font-semibold text-pink-600 text-[10px] sm:text-xs">2</span>
              </div>
              <div className="border border-pink-300 bg-white rounded px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1 sm:gap-1.5">
                <span className="text-gray-600 text-[10px] sm:text-xs"><span className="sm:hidden">Prof. Link</span><span className="hidden sm:inline">Profile Linking</span></span>
                <span className="font-semibold text-pink-600 text-[10px] sm:text-xs">4</span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <button
                className="p-1 sm:p-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50"
                onClick={() => setIsModalOpen(true)}
                title="Edit service status message"
              >
                <Pencil size={12} className="text-gray-500 sm:hidden" />
                <Pencil size={14} className="text-gray-500 hidden sm:block" />
              </button>

              <Toggle
                enabled={isActive}
                onChange={(val: boolean) => {
                  if (!val) {
                    setIsModalOpen(true);
                  } else {
                    setServiceStatus(true, '');
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col gap-2">
          {/* Search + Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 min-w-[100px] px-2 py-1 border border-gray-300 rounded typo-table-cell"
              onChange={handleSearch}
            />
            <select className="px-2 py-1 border border-gray-300 rounded typo-table-cell text-gray-600 bg-white">
              <option>Select User Id ▼</option>
            </select>
            <div className="typo-table-cell text-gray-500 ml-auto whitespace-nowrap">
              Total: <span className="font-semibold text-red-600">{totalFilteredRecords || 1743}</span>
            </div>
          </div>

          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setStatusId(filter.value)}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded border text-[10px] sm:text-xs transition-colors
                  ${
                    statusId === filter.value
                      ? "bg-gray-700 text-white border-gray-700"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="border border-gray-200 rounded overflow-x-auto">
            <table style={{ minWidth: '900px' }} className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["No.", "Title", "User ID", "Status", "User Name", "Email", "Label", "# of Tracks", "Release Date", "Action", "Created At"].map((head) => (
                    <th
                      key={head}
                      className="px-3 py-2 text-left typo-table-head"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {slicedRecords?.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-gray-400 typo-table-cell">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  slicedRecords.map((catalog: any, index: number) => (
                    <AdminAudioListRow
                      key={catalog.releseInfo_id || index}
                      catalog={catalog}
                      index={index}
                      currentPage={currentPage}
                      PAGE_SIZE={PAGE_SIZE}
                    />
                  ))
                )}
              </tbody>
            </table>


          {/* Pagination - Bottom Right */}
          <div className="bg-white px-4 py-2 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronLeft className="text-gray-600" size={14} />
            </button>
            <span className="typo-table-cell text-gray-600">Page: {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronRight className="text-gray-600" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Service Status Modal */}
      <ServiceStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(msg) => {
          setServiceStatus(false, msg);
          setIsModalOpen(false);
        }}
        currentMessage={serviceMessage}
      />
    </div>
  );
}
