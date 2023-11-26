import * as React from "react";
import GetDate from "../../utility/GetDate";
import { FaEdit } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";


export default function ListRow({ label, index }: { label: any, index: any }) {
    const size = useResponsiveIconSize();

    const iconSelector = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <p style={{ color: "black" }}>
                        <MdBookmarks size={size} />
                    </p>
                );
            case 1:
                return (
                    <p style={{ color: "#808080" }}>
                        <BsClock size={size} />
                    </p>
                );
            case 2:
                return (
                    <p style={{ color: "#add8e6" }}>
                        <FcCancel size={size} />
                    </p>
                );
            case 3:
                return (
                    <p style={{ color: "#0000cd" }}>
                        <VscGitPullRequestNewChanges size={size} />
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {iconSelector(label.Status) || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <FaEdit />
                </td>
            </tr>
        </>
    )
}