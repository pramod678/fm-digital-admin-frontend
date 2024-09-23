import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { DeleteUserDataApi } from "../../api/user";
import ConfirmationButton from "../../ui/ConfirmationButton";



export default function ManageUserListRow({ data, index, currentPage, PAGE_SIZE }: { data: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    const { mutate: DeleteUserData } = DeleteUserDataApi()
    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.fname + " " + data.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.phoneNumber || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.labelData?.length || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.releseInfo?.length || 0}
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
                                    <p className="text-sm">{data?.email}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Password:</p>
                                    <p className="text-sm">{data?.password}</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold  sm:text-sm">First Name:</p>
                                    <p className="text-sm">{data?.fname}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Last Name:</p>
                                    <p className="text-sm">{data?.lname}</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold  sm:text-sm">Address:</p>
                                    <p className="text-sm">{data?.address}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Phone Number:</p>
                                    <p className="text-sm">{data?.phoneNumber}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Country:</p>
                                    <p className="text-sm">{data?.country}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">State:</p>
                                    <p className="text-sm">{data?.state}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">City:</p>
                                    <p className="text-sm">{data?.city}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Post Code:</p>
                                    <p className="text-sm">{data?.postCode}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Facebook</p>
                                    <p className="text-sm">{data?.facebook}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Instagram:</p>
                                    <p className="text-sm">{data?.instagram}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Twitter:</p>
                                    <p className="text-sm">{data?.twitter}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Youtube:</p>
                                    <p className="text-sm">{data?.youtube}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Google Plus:</p>
                                    <p className="text-sm">{data?.islo}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">LinkedIn:</p>
                                    <p className="text-sm">{data?.islo}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Vevo:</p>
                                    <p className="text-sm">{data?.islo}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">SoundCloud:</p>
                                    <p className="text-sm">{data?.islo}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Beneficiary Name:</p>
                                    <p className="text-sm">{data?.beneficiaryName}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Bank Name:</p>
                                    <p className="text-sm">{data?.bankName}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">IBAN/Account Number:</p>
                                    <p className="text-sm">{data?.accountNumber}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">IFSC Code:</p>
                                    <p className="text-sm">{data?.IFSCcode}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Swift Code:</p>
                                    <p className="text-sm">{data?.islo}</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
            <tr className="">
                <td colSpan={10}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <ConfirmationButton onConfirm={() => {
                            DeleteUserData(data.users_id)
                        }} title={"Are you sure you want to delete the user ?"}>
                            <button
                                type="button"
                                className="bg-red-700 hover:bg-red-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Delete User
                            </button>
                        </ConfirmationButton>

                        <Link to={`/ManageUser/Labels/${data.users_id}`}>
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {

                                }}
                            >
                                Go to Label
                            </button>
                        </Link>
                        <Link to={`/ManageUser/Catalogs/${data.users_id}`}>
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