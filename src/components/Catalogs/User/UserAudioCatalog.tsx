import * as React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AppHeader from "../../SharedLayout/AppHeader";
// import { UserDataApi } from "../../../api/releaseInfo"; // Commented out for dummy data
// import { GetCatalogsApi } from "../../../api/catalogs"; // Commented out for dummy data
import { BounceLoader } from "react-spinners";

// BACKEND NOTE: Status filters should map to backend status enums.
const STATUS_FILTERS = [
  { label: 'All', value: 'All', color: 'border-gray-300 text-gray-500' },
  { label: 'Pending', value: 1, color: 'border-gray-300 text-gray-500' },
  { label: 'Draft', value: 0, color: 'border-gray-300 text-gray-500' },
  { label: 'Approved', value: 4, color: 'border-green-500 text-green-600' },
  { label: 'Rejected', value: 2, color: 'border-red-500 text-red-600' },
  { label: 'Corrections', value: 3, color: 'border-orange-300 text-orange-400' },
];

const DUMMY_DATA = [
    {
        releseInfo_id: 101,
        Status: 4, // Approved
        ImageDocument: "", // Placeholder or leave empty for default
        Title: "Summer Vibes Vol. 1",
        ArtistName: "The Weeknd",
        Genre: "Pop",
        Label: "XO Records",
        Tracks: 3,
        ReleaseDate: "2024-01-15",
        Language: "English",
        Explicit: "No",
        RejectReason: null,
        UPC: "19438205832",
        PLine: "2024 XO Records",
        CLine: "2024 XO Records",
        tracksArray: [
            { Title: "Blinding Lights", ArtistName: "The Weeknd", Genre: "Synth-pop", ISRC: "US-UM7-19-15699", Status: 4 },
            { Title: "Save Your Tears", ArtistName: "The Weeknd", Genre: "Synth-pop", ISRC: "US-UM7-20-00996", Status: 4 },
            { Title: "In Your Eyes", ArtistName: "The Weeknd", Genre: "Synth-pop", ISRC: "US-UM7-20-00997", Status: 4 }
        ]
    },
    {
        releseInfo_id: 102,
        Status: 2, // Rejected
        ImageDocument: "", 
        Title: "Underground Hype",
        ArtistName: "Lil Unknown",
        Genre: "Hip Hop",
        Label: "Indie Label",
        Tracks: 2,
        ReleaseDate: "2024-02-20",
        Language: "English",
        Explicit: "Yes",
        RejectReason: "Copyright Infringement - Sample used in Track 2 is uncleared.",
        UPC: "88438201122",
        PLine: "2024 Indie Label",
        CLine: "2024 Indie Label",
        tracksArray: [
             { Title: "Flow State", ArtistName: "Lil Unknown", Genre: "Trap", ISRC: "US-XYZ-24-00001", Status: 2 },
             { Title: "Sample Heavy", ArtistName: "Lil Unknown", Genre: "Trap", ISRC: "US-XYZ-24-00002", Status: 2 }
        ]
    }
];

const UserAudioCatalog = () => {
  const navigate = useNavigate();
  // const [userData, setUserData] = React.useState<any>("")
  // const token = localStorage.getItem("token")
  // const [catalogsGet, setcatalogsGet] = React.useState([]);
  
  // Use 'All' as default filter (mapped to selectedOption in API)
  const [activeFilter, setActiveFilter] = React.useState<string | number>('All');
  
  // const { mutate: getUserData } = UserDataApi(setUserData, navigate)
  // Fetch catalogs based on user ID and selected filter
  // const { data: getCatalogs, isLoading: isLoadinggetCatalogs, isFetching } = GetCatalogsApi(userData.users_id, setcatalogsGet, activeFilter)

  const [records, setRecords] = React.useState<any[]>(DUMMY_DATA);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const PAGE_SIZE = 10;

  // React.useEffect(() => {
  //    getUserData({ token: token });
  // }, []);

  // React.useEffect(() => {
  //    if (catalogsGet) {
  //        setRecords(catalogsGet);
  //        setCurrentPage(1);
  //    }
  // }, [catalogsGet]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleFilterChange = (filterVal: string | number) => {
    setActiveFilter(filterVal);
    // Filter dummy data
    if (filterVal === 'All') {
        setRecords(DUMMY_DATA);
    } else {
        setRecords(DUMMY_DATA.filter(item => item.Status === filterVal));
    }
    setCurrentPage(1);
  };

  const filterRecords = (data: any[], term: string) => {
      if (!term) return data;
      return data.filter(
          (row) =>
              (row.Title && row.Title.toLowerCase().includes(term)) ||
              (row.ArtistName && row.ArtistName.toLowerCase().includes(term)) ||
              (row.Label && row.Label.toLowerCase().includes(term))
      );
  };

  const filteredRecords = filterRecords(records, searchQuery);
  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);
  
  const getCurrentPageData = () => {
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      return filteredRecords.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();

  const handleRowClick = (item: any) => {
      // Navigate to detailed view
      navigate(`/user/catalog/audio/${item.releseInfo_id}`, { state: item });
  }

  const handleStoreClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log("Fetch stores for", id);
  };

  const getStatusLabel = (status: number) => {
      switch(status) {
          case 0: return "Draft";
          case 1: return "Pending";
          case 2: return "Rejected";
          case 3: return "Corrections";
          case 4: return "Approved";
          default: return "-";
      }
  };

  const rightActions = (
    <div className="flex items-center justify-between xl:justify-end gap-4 w-full">
      <button 
        onClick={() => navigate('/user/catalog/video')}
        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 sm:px-4 sm:py-1.5 rounded typo-btn-main transition-colors text-xs sm:text-sm"
      >
        Go To Video Catalog
      </button>
      <div className="flex flex-col items-end leading-tight text-gray-800">
         <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500">Total Releases</span>
         <span className="text-xl sm:text-2xl font-bold">{filteredRecords.length}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* {(isLoadinggetCatalogs || isFetching) && (
          <div className="absolute inset-0 flex justify-center items-center z-50 bg-white/50">
              <BounceLoader size={60} color={"#000000"} />
          </div>
      )} */}

      <AppHeader title="Audio Catalog" />

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
                 key={filter.label}
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
                <th className="px-4 py-3 font-semibold w-24">Status</th>
                <th className="px-4 py-3 font-semibold w-32">Album Artwork</th>
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
              {currentData.length === 0 ? (
                  <tr>
                      <td colSpan={10} className="text-center py-8 text-gray-500 typo-table-cell">No records found.</td>
                  </tr>
              ) : currentData.map((item, index) => (
                <tr 
                  key={item.releseInfo_id || index} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="px-4 py-3 typo-table-cell-strong text-gray-600">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-500 text-center">{getStatusLabel(item.Status)}</td>
                  <td className="px-4 py-3">
                    {item.ImageDocument ? (
                        <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                             <img 
                                src={`https://api.fmdigitalofficial.com/${item.ImageDocument}`} 
                                alt="Artwork" 
                                className="w-full h-full object-cover"
                             />
                        </div>
                    ) : (
                        <div className="w-16 h-16 border border-gray-200 rounded-md flex items-center justify-center bg-gray-50 text-[10px] text-gray-400 font-medium">
                        No Art
                        </div>
                    )}
                  </td>
                  <td className="px-4 py-3 typo-table-cell-strong text-gray-800 py-4 max-w-[200px] truncate" title={item.Title}>{item.Title || '-'}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600">{item.ArtistName || '-'}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600">{item.Genre || '-'}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600 truncate max-w-[150px]">{item.Label || '-'}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600 pl-8">{item.Tracks || '-'}</td>
                  <td className="px-4 py-3 typo-table-cell text-gray-600">{item.ReleaseDate || '-'}</td>
                  <td className="px-4 py-3">
                     <button 
                       onClick={(e) => handleStoreClick(e, item.releseInfo_id)}
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
           {totalPages > 1 && (
               <div className="p-4 border-t border-gray-200 flex justify-end items-center gap-2 bg-white">
                    <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                    disabled={currentPage === 1}
                    >
                    <FiChevronLeft size={16} />
                    </button>
                    <div className="typo-table-cell text-gray-600 px-2">
                    Page: {currentPage} / {totalPages}
                    </div>
                    <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    >
                    <FiChevronRight size={16} />
                    </button>
               </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default UserAudioCatalog;
