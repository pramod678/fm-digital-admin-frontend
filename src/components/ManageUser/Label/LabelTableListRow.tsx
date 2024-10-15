import * as React from "react";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import { UpdateLabelAdminApi } from "../../../api/label";
import { BsCheckCircle } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";



export default function LabelTableListRow({ data, index }: { data: any, index: any }) {
    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };

    const handleDownload = (link: any) => {
        const fileUrl = `https://api.fmdigitalofficial.com/${link}`;

        // Open a new window with the file URL
        const newWindow = window.open(fileUrl, '_blank');
    };

    const { mutate: UpdateLabelAdmin } = UpdateLabelAdminApi()
    const size = useResponsiveIconSize()


    const iconSelector = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        --
                    </>
                );
            case 1:
                return (
                    <p style={{ color: "green" }}>
                        <BsCheckCircle size={size} />
                    </p>
                );
            case 2:
                return (
                    <p style={{ color: "#add8e6" }}>
                        <FcCancel size={size} />
                    </p>
                );
            default:
                return <></>;
        }
    };
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.artistId || '--'} */}
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.title || '--'}
                </td>
                <td className="cursor-pointer px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => handleUrlClick(data.youtubeURL)}>
                    <IoLogoYoutube size={size} />
                </td>
                <td className=" cursor-pointer px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => handleDownload(data?.labelDocument)}
                >
                    <p>Download</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {iconSelector(data.Status) || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateLabelAdmin({ users_id: data.users_id, label_id: data.label_id, "Status": 4 })
                            }}
                        >
                            Approve Label
                        </button>
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateLabelAdmin({ users_id: data.users_id, label_id: data.label_id, "Status": 2 })
                            }}
                        >
                            Reject Label
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}