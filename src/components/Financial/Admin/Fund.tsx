import * as React from "react";
import { ChevronDown } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";

// Fund Page Component
const Fund = () => {
  const [activeTab, setActiveTab] = React.useState("fund");

  const payoutData = [
    {
      amount: 100,
      date: "14/02/2025 10:33 PM",
      earning: "Audio Distribution",
      vendor: "Fuga",
      requestedBy: "Admin",
      commission: 20,
    },
    {
      amount: 100,
      date: "14/02/2025 10:33 PM",
      earning: "Audio Distribution",
      vendor: "Fuga",
      requestedBy: "Admin",
      commission: 20,
    },
    {
      amount: 100,
      date: "14/02/2025 10:33 PM",
      earning: "Audio Distribution",
      vendor: "Fuga",
      requestedBy: "Admin",
      commission: 20,
    },
    {
      amount: 100,
      date: "14/02/2025 10:33 PM",
      earning: "Audio Distribution",
      vendor: "Fuga",
      requestedBy: "Admin",
      commission: 20,
    },
    {
      amount: 100,
      date: "14/02/2025 10:33 PM",
      earning: "Audio Distribution",
      vendor: "Fuga",
      requestedBy: "Admin",
      commission: 20,
    },
    {
      amount: 100,
      date: "14/02/2025 10:33 PM",
      earning: "Audio Distribution",
      vendor: "Fuga",
      requestedBy: "Admin",
      commission: 20,
    },
  ];

  return (
    <div className="">
      <div className="max-w-8xl mx-auto pt-1">

        <div className="flex pt-1 mb-2 w-3/5">
          <div className="text-[14.6px] pr-16">
            Here, you can access detailed royalty reports for your music earnings.
            Some stores may take up to three months 📝 to report sales, so recent earnings might not appear immediately.
          </div>
        </div>

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
              Payout History
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
                    <th className="w-12 px-4 py-3 text-left typo-table-head">
                      No
                    </th>
                    <th className="w-28 px-4 py-3 text-left typo-table-head">
                      Amount
                    </th>
                    <th className="w-40 px-4 py-3 text-left typo-table-head">
                      Date
                    </th>
                    <th className="w-44 px-4 py-3 text-left typo-table-head">
                      Earning Resources
                    </th>
                    <th className="w-28 px-4 py-3 text-left typo-table-head">
                      Vendor
                    </th>
                    <th className="w-32 px-4 py-3 text-left typo-table-head">
                      Requested By
                    </th>
                    <th className="w-36 px-4 py-3 text-left typo-table-head">
                      Company Commission
                    </th>
                  </tr>
                </thead>
              </table>

              {/* Scrollable body */}
              <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                <table className="w-full table-fixed min-w-[800px]">
                  <tbody className="divide-y divide-gray-200">
                    {payoutData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="w-12 px-4 py-3 typo-table-cell">
                          {index + 1}
                        </td>
                        <td className="w-28 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {item.amount}.00
                        </td>
                        <td className="w-40 px-4 py-3 typo-table-cell whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="w-44 px-4 py-3 typo-table-cell">
                          {item.earning}
                        </td>
                        <td className="w-28 px-4 py-3 typo-table-cell">
                          {item.vendor}
                        </td>
                        <td className="w-32 px-4 py-3 typo-table-cell">
                          {item.requestedBy}
                        </td>
                        <td className="w-36 px-4 py-3 typo-table-cell whitespace-nowrap">
                          $ {item.commission}.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals row */}
              {(() => {
                const totalAmount = payoutData.reduce(
                  (acc, cur) => acc + Number(cur.amount || 0),
                  0
                );
                const totalCommission = payoutData.reduce(
                  (acc, cur) => acc + Number(cur.commission || 0),
                  0
                );

                return (
                  <table className="w-full table-fixed min-w-[800px]">
                    <tfoot>
                      <tr className="bg-purple-200">
                        <td className="w-12 px-4 py-3 typo-table-cell-strong">
                          Totals
                        </td>
                        <td className="w-28 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {totalAmount.toFixed(2)}
                        </td>
                        <td className="w-40"></td>
                        <td className="w-44"></td>
                        <td className="w-28"></td>
                        <td className="w-32"></td>
                        <td className="w-36 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {totalCommission.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                );
              })()}
            </div>

            <div className="ml-8 shrink-0 border-l border-gray-100 pl-8">
              <button className="flex items-center gap-2 border-2 rounded-3xl border-gray-900 text-gray-900 px-4 py-2 typo-btn-main hover:bg-gray-100 transition-colors">
                <span><FiPlusCircle /></span> Add Fund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fund;

