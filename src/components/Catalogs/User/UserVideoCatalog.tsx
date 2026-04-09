import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AppHeader from "../../SharedLayout/AppHeader";

// BACKEND NOTE: Video Catalog filters should follow the same status enum contract as Audio Catalog.
const STATUS_FILTERS = [
  { label: 'All', value: 'all', color: 'border-gray-300 text-gray-500' },
  { label: 'Pending', value: 'pending', color: 'border-gray-300 text-gray-500' },
  { label: 'Draft', value: 'draft', color: 'border-gray-300 text-gray-500' },
  { label: 'Approved', value: 'approved', color: 'border-green-500 text-green-600' },
  { label: 'Rejected', value: 'rejected', color: 'border-red-500 text-red-600' },
  { label: 'Corrections', value: 'corrections', color: 'border-orange-300 text-orange-400' },
];

const UserVideoCatalog = () => {
  const navigate = useNavigate();
  // BACKEND NOTE: Implement page-based pagination with page + limit params.
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("pending");

  // BACKEND NOTE: Backend should apply filtering based on `status` param and return filtered results with total count.
  const videoData = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Shadow",
      genre: "Electronic",
      label: "FM Digital",
      tracks: 1,
      date: "2025-03-15",
      status: "-"
    },
    {
      id: 2,
      title: "Mountain Echo",
      artist: "Nature Sounds",
      genre: "Ambient",
      label: "FM Digital",
      tracks: 1,
      date: "2024-12-20",
      status: "-"
    },
    {
      id: 3,
      title: "City Lights",
      artist: "Urban Beats",
      genre: "Hip Hop",
      label: "FM FEEL music",
      tracks: 1,
      date: "2024-10-10",
      status: "-"
    },
    {
      id: 4,
      title: "Ocean Waves",
      artist: "Relaxation Pro",
      genre: "Meditation",
      label: "FM FEEL music",
      tracks: 1,
      date: "2024-08-05",
      status: "-"
    },
    {
      id: 5,
      title: "Thunder Storm",
      artist: "Nature Sounds",
      genre: "Ambient",
      label: "FM Digital",
      tracks: 1,
      date: "2024-06-12",
      status: "-"
    },
    {
      id: 6,
      title: "Sunset Drive",
      artist: "Chill Vibes",
      genre: "Chillout",
      label: "FM FEEL music",
      tracks: 1,
      date: "2024-04-18",
      status: "-"
    },
    {
      id: 7,
      title: "Forest Path",
      artist: "Nature Walk",
      genre: "Ambient",
      label: "FM Digital",
      tracks: 1,
      date: "2024-02-22",
      status: "-"
    },
    {
      id: 8,
      title: "Neon Dreams",
      artist: "Synthwave Pro",
      genre: "Synthwave",
      label: "FM FEEL music",
      tracks: 1,
      date: "2023-12-30",
      status: "-"
    },
    {
      id: 9,
      title: "Jazz Night",
      artist: "Smooth Jazz",
      genre: "Jazz",
      label: "FM Digital",
      tracks: 1,
      date: "2023-10-14",
      status: "-"
    },
    {
      id: 10,
      title: "Rock Festival",
      artist: "Power Rocks",
      genre: "Rock",
      label: "FM FEEL music",
      tracks: 1,
      date: "2023-08-08",
      status: "-"
    },
  ];

  /* 
     BACKEND NOTE: Implement search query param for title/artist/label.
  */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /*
     BACKEND NOTE: Selected status filter should be sent as a query parameter (e.g., ?status=approved) to the catalog listing API.
  */
  const handleFilterChange = (filterVal: string) => {
    setActiveFilter(filterVal);
  };

  React.useEffect(() => {
    // This effect simulates the API call trigger whenever filters change.
    console.log(`Fetching data with params: status=${activeFilter}, search=${searchQuery}, page=${currentPage}`);
    // api.fetchCatalog({ status: activeFilter, search: searchQuery, page: currentPage });
  }, [activeFilter, searchQuery, currentPage]);

  const handleStoreClick = (id: number) => {
    console.log("Fetch stores for", id);
  };

  const rightActions = (
    <div className="flex items-center justify-between xl:justify-end gap-4 w-full">
      <button 
        onClick={() => navigate('/user/catalog/audio')}
        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 sm:px-4 sm:py-1.5 rounded typo-btn-main transition-colors text-xs sm:text-sm"
      >
        Go To Audio Catalog
      </button>
      <div className="flex flex-col items-end leading-tight text-gray-800">
         <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500">Total Releases</span>
         {/* BACKEND NOTE: Total releases count should come from catalog summary API. */}
         <span className="text-xl sm:text-2xl font-bold">100</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <AppHeader title="Video Catalog" />

      <div className="p-6 flex flex-col gap-4 h-full overflow-hidden">
        
        {/* Top Controls Bar */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 w-full">
          
          {/* Top: Search */}
          <div className="w-full xl:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 typo-table-cell focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
            />
          </div>

          {/* Middle: Filters - Grid on mobile (3 cols), Flex on desktop */}
          <div className="grid grid-cols-3 xl:flex xl:items-center gap-2 w-full xl:w-auto">
             {STATUS_FILTERS.map((filter) => (
               <button
                 key={filter.value}
                 onClick={() => handleFilterChange(filter.value)}
                 className={`px-1.5 py-1.5 sm:px-4 sm:py-1.5 rounded-md text-[10px] sm:text-xs xl:typo-table-cell font-semibold border bg-white transition-all whitespace-nowrap text-center
                   ${filter.color}
                   ${activeFilter === filter.value ? 'ring-1 ring-offset-1 ring-gray-200 shadow-sm bg-gray-50' : 'hover:bg-gray-50'}
                 `}
               >
                 {filter.label}
               </button>
             ))}
          </div>

          {/* Bottom/Right: Actions (Button on left, Count on right on mobile) */}
          <div className="xl:ml-auto w-full xl:w-auto flex-shrink-0">
             {rightActions}
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 border border-gray-200 rounded-lg overflow-x-auto bg-white flex flex-col min-h-0">
          <div className="flex-1">
          <table style={{ minWidth: '1000px' }} className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="typo-table-head border-b border-gray-200">
                <th className="px-4 py-3 font-semibold w-16">No.</th>
                <th className="px-4 py-3 font-semibold w-20">Status</th>
                <th className="px-4 py-3 font-semibold w-32">Video Thumbnail</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Artist Name</th>
                <th className="px-4 py-3 font-semibold w-24">Genre</th>
                <th className="px-4 py-3 font-semibold">Label</th>
                <th className="px-4 py-3 font-semibold w-24"># of tracks</th>
                <th className="px-4 py-3 font-semibold w-32">Release Date</th>
                <th className="px-4 py-3 font-semibold w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {videoData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 typo-table-cell-strong text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-500 text-center">{item.status}</td>
                  <td className="px-4 py-3">
                    {/* 
                       BACKEND NOTE: Audio Catalog artwork currently renders placeholder only. 
                       Backend may not be returning artwork URL yet. Frontend should render image when URL becomes available.
                       Using similar logic for Video Thumbnail.
                    */}
                    <div className="w-16 h-16 border border-gray-200 rounded-md flex items-center justify-center bg-white text-[10px] text-gray-400 font-medium text-center leading-tight">
                      Video<br/>Thumbnail
                    </div>
                  </td>
                  <td className="px-4 py-3 typo-table-cell-strong text-gray-800 py-4 max-w-[200px] truncate" title={item.title}>{item.title}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600">{item.artist}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600">{item.genre}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600 truncate max-w-[150px]">{item.label}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600 pl-8">{item.tracks}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600">{item.date}</td>
                  <td className="px-4 py-3">
                     <button 
                       onClick={() => handleStoreClick(item.id)}
                       className="bg-[#6B46C1] hover:bg-[#553C9A] text-white typo-btn-action px-3 py-1.5 rounded shadow-sm transition-colors normal-case"
                     >
                       Stores
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
           {/* Pagination */}
           <div className="p-4 border-t border-gray-200 flex justify-end items-center gap-2 bg-white">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft size={16} />
                </button>
                <div className="typo-table-cell text-gray-600 px-2">
                  Page: {currentPage}
                </div>
                <button 
                   onClick={() => setCurrentPage(p => p + 1)}
                   className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
                >
                  <FiChevronRight size={16} />
                </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default UserVideoCatalog;
