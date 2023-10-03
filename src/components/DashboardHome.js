import { FaCircleInfo } from "react-icons/fa6"
import { FaRegCircleDot } from "react-icons/fa6"
import { GrEdit } from "react-icons/gr"
import { IoIosStats } from "react-icons/io"
import { BiRefresh } from "react-icons/bi"
import { TbDatabaseDollar } from 'react-icons/tb'
import { BsCurrencyDollar } from 'react-icons/bs'

export default function UserHome({ userData }) {
  // console.log("userData",userData);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };


  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
          <div className="flex flex-col gap-1 h-full">
            <div className="bg-black px-4 py-2">
              <p className="text-white mb-0 text-lg font-semibold">Latest Playlists</p>
            </div>
            <div className="h-[500px] bg-[#363636] overflow-y-auto max-h-[480px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                {/* Spotify Cards */}
                <div className="h-12 col-span-1 md:col-span-2 py-2 px-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-28 md:h-32 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute top-1 left-1 bg-gray-300 text-black text-xs px-2 py-1 rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </div>
                        <div className="mt-2 ">
                          <p className="text-sm md:text-md font-bold text-white mb-1">Title</p>
                          <p className="text-xs  text-gray-300 mb-2 overflow-hidden line-clamp-2">Very long long that might be truncated if too long</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-28 md:h-32 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute top-1 left-1 bg-gray-300 text-black text-xs px-2 py-1 rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </div>
                        <div className="mt-2 ">
                          <p className="text-sm md:text-md font-bold text-white mb-1">Title</p>
                          <p className="text-xs  text-gray-300 mb-2 overflow-hidden line-clamp-2">Very long long that might be truncated if too long</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-28 md:h-32 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute top-1 left-1 bg-gray-300 text-black text-xs px-2 py-1 rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </div>
                        <div className="mt-2 ">
                          <p className="text-sm md:text-md font-bold text-white mb-1">Title</p>
                          <p className="text-xs  text-gray-300 mb-2 overflow-hidden line-clamp-2">Very long long that might be truncated if too long</p>
                        </div>
                      </div>
                    </div>

                    

                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-28 md:h-32 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute top-1 left-1 bg-gray-300 text-black text-xs px-2 py-1 rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </div>
                        <div className="mt-2 ">
                          <p className="text-sm md:text-md font-bold text-white mb-1">Title</p>
                          <p className="text-xs  text-gray-300 mb-2 overflow-hidden line-clamp-2">Very long long that might be truncated if too long</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-28 md:h-32 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute top-1 left-1 bg-gray-300 text-black text-xs px-2 py-1 rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </div>
                        <div className="mt-2 ">
                          <p className="text-sm md:text-md font-bold text-white mb-1">Title</p>
                          <p className="text-xs  text-gray-300 mb-2 overflow-hidden line-clamp-2">Very long long that might be truncated if too long</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-28 md:h-32 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute top-1 left-1 bg-gray-300 text-black text-xs px-2 py-1 rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </div>
                        <div className="mt-2 ">
                          <p className="text-sm md:text-md font-bold text-white mb-1">Title</p>
                          <p className="text-xs  text-gray-300 mb-2 overflow-hidden line-clamp-2">Very long long that might be truncated if too long</p>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

                {/* Youtube Cards */}
                <div className="h-12 col-span-1 py-2 px-1">
                  <div className="flex flex-col w-full gap-2 px-2">
                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-30 md:h-36 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-2 py-1 rounded-sm w-8 h-5 flex items-center justify-center">02:33</span>
                        </div>
                        <div className="mt-2 ">
                          {/* profile picture with title */}
                          <div className="flex items-start space-x-2">
                            <img src="./images/top.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="text-sm md:text-md font-bold text-white mb-1 overflow-hidden line-clamp-1">Titlesssss</p>
                              {/* below name and 5K views . 3 days go */}
                              <p className="text-xs text-gray-300 mb-2">Name</p>
                              <p className="text-xs text-gray-300 mb-2">5K views | 3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#212121] px-2 py-1 rounded-sm shadow-lg relative">
                      <div className="flex flex-col items-start">
                        <div className="w-full h-30 md:h-36 relative">
                          <img src="./images/top.jpg" alt="..." className="object-cover h-full w-full rounded-sm" />
                          <span className="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-2 py-1 rounded-sm w-8 h-5 flex items-center justify-center">02:33</span>
                        </div>
                        <div className="mt-2 ">
                          {/* profile picture with title */}
                          <div className="flex items-start space-x-2">
                            <img src="./images/top.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="text-sm md:text-md font-bold text-white mb-1 overflow-hidden line-clamp-1">Titlesssss</p>
                              {/* below name and 5K views . 3 days go */}
                              <p className="text-xs text-gray-300 mb-2">Name</p>
                              <p className="text-xs text-gray-300 mb-2">5K views | 3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
          <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full h-auto bg-white py-2 px-2 mb-4">
            <div className="flex items-center justify-start gap-2 border-b border-gray-300 py-2 px-2">
              <div className="flex items-center">
                <FaCircleInfo size={20} />
              </div>
              <div className="flex items-center">
                <p className="mb-0">Connection requested</p>
              </div>
            </div>

            {['Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla'].map(name => (
              <div className="px-2 py-2 border-b border-gray-300 flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <FaRegCircleDot size={15} />

                  <div className="flex flex-col ">
                    <p className="text-blue-500 text-sm mb-0">{name}</p>
                    <p className="text-gray-500 text-xs mb-0">Date Created 17 Feb 1521</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <GrEdit size={18} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full h-auto bg-white mb-4 py-2 px-2 ">
            <div className="flex items-center justify-between gap-3 border-b border-gray-300 py-2 px-2">
              <div className="flex items-center">
                <IoIosStats size={22} />
                <p className="mb-0 ml-2">Drafts</p>
              </div>
              <div className="flex items-center justify-center bg-red-500 text-white rounded-sm h-6 w-6">
                <p className="m-0 text-sm">1</p>
              </div>

            </div>


            {['Raju Gangitla'].map(name => (
              <div className="px-2 py-2 border-b border-gray-300 flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <FaRegCircleDot size={15} />

                  <div className="flex flex-col ">
                    <p className="text-blue-500 text-sm mb-0">{name}</p>
                    <p className="text-gray-500 text-xs mb-0">Date Created 17 Feb 1521</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <GrEdit size={18} />
                </div>
              </div>
            ))}

            <button className="items-start border border-gray-500 mt-2 mx-auto px-2">
              <span>+</span>
              More
            </button>
          </div>

          <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full h-auto bg-white  py-2 px-2 ">
            <div className="flex items-center justify-between gap-3 border-b border-gray-300 py-2 px-2">
              <div className="flex items-center">
                <TbDatabaseDollar size={22} />
                <p className="mb-0 ml-2">Payments</p>
              </div>
              <div className="flex items-center justify-center h-6 w-6">
                <BiRefresh size={22} />
              </div>

            </div>



            <button className="items-start text-white border bg-green-400 border-gray-500 mt-2  mx-auto px-2">
              <span className="flex items-center gap-1 py-1"><BsCurrencyDollar color={'#ffffff'} /> 0.00  </span>
            </button>
          </div>

        </div>


      </div>

    </>
  );
}


