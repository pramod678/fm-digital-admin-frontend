// UserFund.tsx
import * as React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

// User Fund Page Component
const UserFund = () => {
  const userData = [
    {
      amount: 25,
      date: "14/02/2025 10:33 PM",
      userId: "01",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 30,
      date: "14/02/2025 10:33 PM",
      userId: "05",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 50,
      date: "14/02/2025 10:33 PM",
      userId: "08",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 200,
      date: "14/02/2025 10:33 PM",
      userId: "25",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 15,
      date: "14/02/2025 10:33 PM",
      userId: "85",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
    {
      amount: 200,
      date: "14/02/2025 10:33 PM",
      userId: "100",
      name: "Name",
      email: "User@gmail.com",
      phone: "+91 1234567891",
      requestedBy: "Admin",
    },
  ];

  return (
    <div className="pt-1">
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
          <div className="pl-4">Transferred to Users Panel $ 664.00</div>
          <div className="pr-4">Transferred to User Bank $ 2957.00</div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              History
            </h2>
          </div>

          {/* Horizontal Line */}
          <hr className="border-gray-200 mb-4" />

          <div className="flex">
            <div className="bg-white rounded-none shadow flex-1 overflow-x-auto">
              {/* Header */}
              <table className="w-full table-fixed min-w-[800px]">
                <thead 
                  className="text-white relative"
                  style={{
                    backgroundImage: 'url(/images/financial/OrangeBigBand.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <tr>
                    <th className="w-10 px-3 py-3 text-left typo-table-head">
                      No
                    </th>
                    <th className="w-24 px-3 py-3 text-left typo-table-head">
                      Amount
                    </th>
                    <th className="w-36 px-3 py-3 text-left typo-table-head">
                      Date
                    </th>
                    <th className="w-20 px-3 py-3 text-left typo-table-head">
                      User ID
                    </th>
                    <th className="w-20 px-3 py-3 text-left typo-table-head">
                      User
                    </th>
                    <th className="w-40 px-3 py-3 text-left typo-table-head">
                      User Email
                    </th>
                    <th className="w-36 px-3 py-3 text-left typo-table-head">
                      Phone Number
                    </th>
                    <th className="w-28 px-3 py-3 text-left typo-table-head">
                      Requested By
                    </th>
                  </tr>
                </thead>
              </table>

              {/* Scrollable body */}
              <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                <table className="w-full table-fixed min-w-[800px]">
                  <tbody className="divide-y divide-gray-200">
                    {userData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="w-10 px-3 py-3 typo-table-cell">
                          {index + 1}
                        </td>
                        <td className="w-24 px-3 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {item.amount}.00
                        </td>
                        <td className="w-36 px-3 py-3 typo-table-cell whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="w-20 px-3 py-3 typo-table-cell">
                          {item.userId}
                        </td>
                        <td className="w-20 px-3 py-3 typo-table-cell">
                          {item.name}
                        </td>
                        <td className="w-40 px-3 py-3 typo-table-cell">
                          {item.email}
                        </td>
                        <td className="w-36 px-3 py-3 typo-table-cell">
                          {item.phone}
                        </td>
                        <td className="w-28 px-3 py-3 typo-table-cell">
                          {item.requestedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals row */}
              {(() => {
                const totalAmount = userData.reduce(
                  (acc, cur) => acc + Number(cur.amount || 0),
                  0
                );

                return (
                  <table className="w-full table-fixed min-w-[800px]">
                    <tfoot>
                      <tr className="bg-purple-200">
                        <td className="w-10 px-3 py-3 typo-table-cell-strong">
                          Totals
                        </td>
                        <td className="w-24 px-3 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {totalAmount.toFixed(2)}
                        </td>
                        <td className="w-36"></td>
                        <td className="w-20"></td>
                        <td className="w-20"></td>
                        <td className="w-40"></td>
                        <td className="w-36"></td>
                        <td className="w-28"></td>
                      </tr>
                    </tfoot>
                  </table>
                );
              })()}
            </div>

            <div className="ml-8 shrink-0 border-l border-gray-100 pl-8">
              <button className="flex items-center gap-2 border-2 rounded-3xl border-gray-900 text-gray-900 px-4 py-2 typo-btn-main hover:bg-gray-100 transition-colors whitespace-nowrap">
                <span><FiPlusCircle /></span> Add User Fund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFund;

