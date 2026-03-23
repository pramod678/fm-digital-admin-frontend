// UserFund.tsx
import * as React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

// User Fund Page Component
const UserFund = () => {
  const userData = [
    {
      amount: 28,
      date: "1x/30/2025 10:33 PM",
      userId: "01",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 10,
      date: "1x/30/2025 10:33 PM",
      userId: "05",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 10,
      date: "1x/30/2025 10:33 PM",
      userId: "08",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 200,
      date: "1x/30/2025 10:33 PM",
      userId: "25",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 10,
      date: "1x/30/2025 10:33 PM",
      userId: "85",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 10,
      date: "1x/30/2025 10:33 PM",
      userId: "100",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
  ];

  return (
    <div className=" pt-1">
      <div className="max-w-8xl mx-auto">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 mb-4 text-center w-1/2 border-gray-300 border-2">
          <div className="text-gray-700 text-sm sm:text-base md:text-lg mb-2">
            Total Panel Fund
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            $ 378.00
          </div>
        </div>

        <div className="flex justify-between items-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-1 mb-2 text-center w-1/2 border-gray-300 border-2">
          <div className="pl-4">C Commission $ 305.00</div>

          <div className="pr-4">Total Fund $ 4306.00</div>
        </div>

        <div className="flex justify-between items-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-1 mb-2 text-center w-1/2 border-gray-300 border-2">
          <div className="pl-4">Transfered to Users Panel $ 664.00</div>

          <div className="pr-4">Transferred to User Bank $ 2957.00</div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="text-xl font-semibold text-gray-800 mt-2">
              History
            </h2>
          </div>

          {/* Horizontal Line */}
          <hr className="border-gray-200 mb-4" />

          <div className="flex">
            <div className="bg-white rounded-none shadow flex-1 overflow-x-auto rounded-lg">
              {/* Header (fixed, not scrollable) */}
              <table className="w-full table-fixed min-w-[1000px]">
                <thead className="bg-orange-400 text-white">
                  <tr>
                    <th className="w-16 px-4 py-3 text-left typo-table-head">
                      No
                    </th>
                    <th className="w-28 px-4 py-3 text-left typo-table-head">
                      Amount
                    </th>
                    <th className="w-44 px-3 py-3 text-left typo-table-head">
                      Date
                    </th>
                    <th className="w-28 px-3 py-3 text-left typo-table-head">
                      User ID
                    </th>
                    <th className="w-44 px-3 py-3 text-left typo-table-head">
                      User
                    </th>
                    <th className="w-42 px-3 py-3 text-left typo-table-head">
                      User Email
                    </th>
                    <th className="w-30 px-3 py-3 text-left typo-table-head">
                      Phone Number
                    </th>
                    <th className="w-26 px-3 py-3 text-left typo-table-head">
                      Requested By
                    </th>
                  </tr>
                </thead>
              </table>

              {/* Scrollable body (only rows scroll) */}
              <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                <table className="w-full table-fixed min-w-[1000px]">
                  <tbody className="divide-y divide-gray-200">
                    {userData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="w-16 px-4 py-3 typo-table-cell">
                          {index + 1}
                        </td>
                        <td className="w-28 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {item.amount}.00
                        </td>
                        <td className="w-44 px-4 py-3 typo-table-cell whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="w-28 px-4 py-3 typo-table-cell">
                          {item.userId}
                        </td>
                        <td className="w-44 px-4 py-3 typo-table-cell">
                          {item.name}
                        </td>
                        <td className="w-42 px-4 py-3 typo-table-cell">
                          {item.email}
                        </td>
                        <td className="w-30 px-4 py-3 typo-table-cell">
                          {item.phone}
                        </td>
                        <td className="w-26 px-4 py-3 typo-table-cell">
                          {item.requestedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals row — perfectly aligned with table columns */}
              {(() => {
                const totalAmount = userData.reduce(
                  (acc, cur) => acc + Number(cur.amount || 0),
                  0
                );
                // const totalCommission = userData.reduce(
                //   (acc, cur) => acc + Number(cur.commission || 0),
                //   0
                // );

                return (
                  <table className="w-full table-fixed mt-2 min-w-[1000px]">
                    <tfoot>
                      <tr className="bg-purple-200">
                        <td className="w-16 px-4 py-3 typo-table-cell-strong">
                          Totals
                        </td>
                        <td className="w-28 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {totalAmount.toFixed(2)}
                        </td>
                        <td className="w-44"></td>
                        <td className="w-28"></td>
                        <td className="w-44"></td>
                        <td className="w-42"></td>
                        <td className="w-30  py-3 text-sm text-gray-700 "></td>
                        <td className="w-26  py-3 text-sm text-gray-700 "></td>
                      </tr>
                    </tfoot>
                  </table>
                );
              })()}
            </div>

            <div className="ml-8 shrink-0 border-l border-gray-100 pl-8">
              <button className="flex items-center gap-2 border-2 rounded-3xl border-gray-900 text-gray-900 px-4 py-2 typo-btn-main">
                <span>
                  <FiPlusCircle />
                </span>{" "}
                Add Fund
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">History</h2>
            <button className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded text-sm hover:bg-teal-600">
              <span>➕</span> Add User Fund
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-400 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">User ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">User Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Phone Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Requested By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">$ {item.amount}.00</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.userId}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.requestedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-purple-200 rounded-b-lg px-4 py-3 flex justify-between items-center">
            <div className="font-semibold text-gray-800">Totals</div>
            <div className="font-semibold text-gray-800">$ 820.00</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserFund;
