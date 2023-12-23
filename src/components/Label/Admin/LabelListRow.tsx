import * as React from "react";
import { FaEdit } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import UpdateLabel from "../PopUps/UpdateLabel";
// import UpdateLabel from "./PopUps/UpdateLabel";


export default function LabelListRow({ label, index, userData }: { label: any, index: any, userData: any }) {
    const size = useResponsiveIconSize();

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
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {label.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {label.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {label.email || '--'}
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