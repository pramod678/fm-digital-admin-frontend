import * as React from "react";
import { UpdateUserFundApi } from "../../../../api/financial";
import ConfirmationButton from "../../../../ui/ConfirmationButton";
import GetDate from "../../../../utility/GetDate";


export default function ListRow({ d, index, currentPage, PAGE_SIZE }: { d: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    const [isOpen, setIsOpen] = React.useState(false);
    const { mutate: UpdateUserFund } = UpdateUserFundApi()

    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 w-20 text-center py-2 bg-[#9dd3fc] text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                        >
                            <span className="mr-2 text-white font-semibold">Pending</span>
                        </button>
                    </>
                );
            case 1:
                return (
                    <>
                        --
                    </>
                );
            case 2:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 w-20 text-center py-2 bg-red-500 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                        >
                            <span className="mr-2 text-white font-semibold">Reject</span>
                        </button>
                    </>
                );

            case 4:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0000cd] w-20 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none"
                        >
                            <span className=" text-white text-xs font-semibold">Approved</span>
                        </button>
                    </>
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.requested_amount || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.users_id || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.admin_id || "--"}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.users[0]?.email || '--'}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {GetDate(d.createdAt) || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.earning_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.approved_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.requested_amount}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.avlable_amount_panel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.user_amount_panel}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {statusButton(d.Status)}
                </td>

            </tr>
            {/* <tr className="">
                <td colSpan={11}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <ConfirmationButton onConfirm={() => {
                            UpdateUserFund({
                                id: d.user_financial_id,
                                approved_amount: d?.requested_amount,
                                Status: 4
                            })
                        }} title={"Are you sure you want to Approve  ?"}  >
                            <button
                                type="button"
                                className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Approve Amount
                            </button>
                        </ConfirmationButton>

                        <ConfirmationButton onConfirm={() => {
                            UpdateUserFund({ id: d.user_financial_id, Status: 2 })
                        }} title={"Are you sure you want to Reject  ?"} >
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Reject Amount
                            </button>
                        </ConfirmationButton>
                    </div>
                </td>
            </tr> */}
            {/* {isOpen && (
                <tr className="">
                    <td colSpan={10} className="p-4">
                        <UserHistoryTable labelData={[]} />
                    </td>
                </tr>
            )} */}
        </>
    )
}