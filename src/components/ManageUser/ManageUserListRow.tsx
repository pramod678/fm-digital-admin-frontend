import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";



export default function ManageUserListRow({ data, index }: { data: any, index: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.phone || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.numberOfTracks || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.noofCatalogs ? data.noofCatalogs : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex justify-end">
                    {isOpen ? (
                        <FaChevronUp className="text-gray-500" />
                    ) : (
                        <FaChevronDown className="text-gray-500" />
                    )}
                </td>
            </tr>
            {isOpen && (
                <tr className="w-full">
                    <td colSpan={8} className="px-0 py-0">
                        <div className="px-6 py-4 grid grid-cols-3 gap-16">
                            {/* Your accordion content goes here */}
                            <div>
                                <div className="flex items-center justify-between  mb-1 mb-1">
                                    <p className="font-semibold  sm:text-sm">Email:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Password:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold  sm:text-sm">First Name:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Last Name:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold  sm:text-sm">Address:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Phone Number:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Country:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">State:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">City:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Post Code:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Facebook</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Instagram:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Twitter:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Youtube:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Google Plus:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">LinkedIn:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Vevo:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">SoundCloud:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Beneficiary Name:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Bank Name:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">IBAN/Account Number:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">IFSC Code:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Swift Code:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
            <tr className="">
                <td colSpan={10}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <button
                            type="button"
                            className="bg-red-700 hover:bg-red-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                            }}
                        >
                            Delete User
                        </button>
                        <Link to={`/ManageUser/Labels`}>
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {

                                }}
                            >
                                Go to Label
                            </button>
                        </Link>
                        <Link to={`/ManageUser/Catalogs`}>
                            <button
                                type="button"
                                className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {
                                }}
                            >
                                Go To Catalog
                            </button>
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}