import * as React from "react";
import GetDate from "../../../utility/GetDate";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import ConfirmationButton from "../../../ui/ConfirmationButton";
import { UpdateLabelAdminApi } from "../../../api/endpoint";
import { UpdateUserFundApi } from "../../../api/financial";


export default function ListRow({ d, index, userData, currentPage, PAGE_SIZE }: { d: any, index: any, userData: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    const [isOpen, setIsOpen] = React.useState(false);
    const { mutate: UpdateUserFund } = UpdateUserFundApi()

    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#9dd3fc] typo-btn-action normal-case w-20"
                    >
                        Pending
                    </button>
                );
            case 1:
                return <>--</>;
            case 2:
                return (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 typo-btn-action normal-case w-20"
                    >
                        Reject
                    </button>
                );

            case 4:
                return (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#0000cd] typo-btn-action normal-case w-20"
                    >
                        Approved
                    </button>
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)}>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell-strong">
                    {d.requested_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.users_id || "--"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.users[0]?.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.users[0]?.phoneNumber || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.earning_amount }
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.approved_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.requested_amount}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.avlable_amount_panel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {d.user_amount_panel}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                    {statusButton(d.Status)}
                </td>

            </tr>
            <tr className="">
                <td colSpan={11}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <ConfirmationButton onConfirm={() => {
                            UpdateUserFund({
                                id: d.user_financial_id,
                                users_id: d.users_id,
                                approved_amount: d?.requested_amount,
                                Status: 4,
                                admin_id: userData?.users_id,
                            })
                        }} title={"Are you sure you want to Approve  ?"}  >
                            <button
                                type="button"
                                className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded typo-btn-action normal-case"
                            >
                                Approve Amount
                            </button>
                        </ConfirmationButton>

                        <ConfirmationButton onConfirm={() => {
                            UpdateUserFund({
                                id: d.user_financial_id, users_id: d.users_id, Status: 2, admin_id: userData?.users_id,
                                reject_amount: d?.requested_amount
                            })
                        }} title={"Are you sure you want to Reject  ?"} >
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded typo-btn-action normal-case"
                            >
                                Reject Amount
                            </button>
                        </ConfirmationButton>
                    </div>
                </td>
            </tr>
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