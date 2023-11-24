import * as React from "react";
import GetDate from "../../utility/GetDate";
import { FaEdit } from "react-icons/fa";


export default function ListRow({ label, index }: { label: any, index: any }) {


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
                    {label.status || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <FaEdit />
                </td>
            </tr>
        </>
    )
}