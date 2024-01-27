import * as React from "react";
import GetDate from "../../utility/GetDate";
import { FaEdit } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import UpdateLabel from "./PopUps/UpdateLabel";
import { IoLogoYoutube } from "react-icons/io";


export default function ListRow({ label, index, userData }: { label: any, index: any, userData :any}) {
    const size = useResponsiveIconSize();
    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };

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
            case 4:
                return (
                    <p style={{ color: "green" }}>
                        <BsCheckCircle size={size} />
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
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {label.ImageDocument ? (
                        <div className="w-full flex justify-center">
                            <img
                                src="./images/12thFail.jpeg"
                                alt="label"
                                className="w-8 h-8 object-cover rounded"
                            />
                        </div>
                    ) : (
                        '--'
                    )} */}
                    {label.title || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => handleUrlClick(label.youtubeURL)}>
                    <IoLogoYoutube size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {iconSelector(label.Status) || '--'}
                </td>
                {
                    (label.Status == 0 || label.Status == 1) && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        --
                    </td>
                }
                {
                    label.Status == 2 && <UpdateLabel userData={userData} labelData={label} />

                }

            </tr>
        </>
    )
}