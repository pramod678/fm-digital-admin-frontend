import * as React from "react";
import Edit from "./PopUps/EditManageArtist";
import { FaFacebookSquare, FaSpotify } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { SiApplemusic } from "react-icons/si";
import { FiEdit3 } from "react-icons/fi";

export default function ListRow({ data, index }: { data: any, index: any }) {

    const handleUrlClick = (link: any) => {
        if (link) {
            window.open(link, '_blank');
        }
    };
    
    // Scaled down icon size for a sleeker look
    const iconSize = 18;
    
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-3.5 whitespace-nowrap typo-table-cell text-gray-700">
                {index + 1}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap typo-table-cell-strong text-gray-800">
                {data.PrimaryArtist || '--'}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-center">
                <div className="flex justify-center">
                    {data.InstagramId ? (
                        <GrInstagram 
                            size={iconSize} 
                            className="text-[#E1306C] cursor-pointer hover:scale-110 transition-all duration-200" 
                            onClick={() => handleUrlClick(data.InstagramId)} 
                        />
                    ) : (
                        <GrInstagram size={iconSize} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-center">
                <div className="flex justify-center">
                    {data.FacebookId ? (
                        <FaFacebookSquare 
                            size={iconSize} 
                            className="text-[#1877F2] cursor-pointer hover:scale-110 transition-all duration-200" 
                            onClick={() => handleUrlClick(data.FacebookId)} 
                        />
                    ) : (
                        <FaFacebookSquare size={iconSize} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-center">
                <div className="flex justify-center">
                    {data.SpotifyId ? (
                        <FaSpotify 
                            size={iconSize + 2} 
                            className="text-[#1DB954] cursor-pointer hover:scale-110 transition-all duration-200" 
                            onClick={() => handleUrlClick(data.SpotifyId)} 
                        />
                    ) : (
                        <FaSpotify size={iconSize + 2} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-center">
                <div className="flex justify-center">
                    {data.AppleId ? (
                        <SiApplemusic 
                            size={iconSize} 
                            className="text-[#FC3C44] cursor-pointer hover:scale-110 transition-all duration-200" 
                            onClick={() => handleUrlClick(data.AppleId)} 
                        />
                    ) : (
                        <SiApplemusic size={iconSize} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-center">
                <div className="flex justify-center">
                    <Edit data={data} customTrigger={
                        <button className="p-1.5 rounded-xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all shadow-sm group">
                            <FiEdit3 size={16} className="group-hover:scale-110 transition-transform" />
                        </button>
                    } />
                </div>
            </td>
        </tr>
    );
}