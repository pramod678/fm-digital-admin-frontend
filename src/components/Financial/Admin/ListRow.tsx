import * as React from "react";
import GetDate from "../../../utility/GetDate";


export default function ListRow({ d, index }: { d: any, index: any }) {


    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.total_amount  || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {GetDate(d.month_date) || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.earning_resources || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.vender || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.requested_by || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.company_commsion || '--'}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.total_amount || '--'}
                </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.user_amount || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.user_amount_panel || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.user_amount_bank || '--'}
                </td> */}
            </tr>
        </>
    )
}