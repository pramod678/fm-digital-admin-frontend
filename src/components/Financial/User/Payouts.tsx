import * as React from "react";
import { ChevronDown } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";

// Payouts Page Component
const Payouts = () => {
  const [activeTab, setActiveTab] = React.useState("fund");

  interface Payout {
    amount?: number;
    date?: string;
    earning?: string;
    vendor?: string;
    requestedBy?: string;
    commission?: number;
  }

  const payoutData: Payout[] = [
    // {
    //   amount: 100,
    //   date: "1x/30/2025 10:33 PM",
    //   earning: "Audio Distribution",
    //   vendor: "Fuga",
    //   requestedBy: "Admin",
    //   commission: 20,
    // },
    // {
    //   amount: 100,
    //   date: "1x/30/2025 10:33 PM",
    //   earning: "Audio Distribution",
    //   vendor: "Fuga",
    //   requestedBy: "Admin",
    //   commission: 20,
    // },
    // {
    //   amount: 100,
    //   date: "1x/30/2025 10:33 PM",
    //   earning: "Audio Distribution",
    //   vendor: "Fuga",
    //   requestedBy: "Admin",
    //   commission: 20,
    // },
    // {
    //   amount: 100,
    //   date: "1x/30/2025 10:33 PM",
    //   earning: "Audio Distribution",
    //   vendor: "Fuga",
    //   requestedBy: "Admin",
    //   commission: 20,
    // },
    // {
    //   amount: 100,
    //   date: "1x/30/2025 10:33 PM",
    //   earning: "Audio Distribution",
    //   vendor: "Fuga",
    //   requestedBy: "Admin",
    //   commission: 20,
    // },
    // {
    //   amount: 100,
    //   date: "1x/30/2025 10:33 PM",
    //   earning: "Audio Distribution",
    //   vendor: "Fuga",
    //   requestedBy: "Admin",
    //   commission: 20,
    // },
  ];

  return (
    <div className="">
      <div className="max-w-8xl mx-auto pt-1">
        {/* <div className=" p-3 mb-6 text-sm text-gray-700 ">
          
          <span className="ml-1">📝</span>
          <br />
          to report sales, so recent earnings might not appear immediately.
        </div> */}

        <div className="flex  pt-1 mb-2 w-3/5    ">
          <div className="text-[14.6px] pr-16">
            Here, you can access detailed royalty reports for your music
            earnings. Some stores may take up to three months to report sales,
            so recent earnings might not appear immediately.
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 mb-4 text-center w-1/2 border-gray-300 border-2">
          <div className="text-gray-700 text-sm sm:text-base md:text-lg mb-2">
            Total Balance
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            $ 00.00
          </div>
        </div>

        <div className="flex justify-between items-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-1 mb-2 text-center w-1/2 border-gray-300 border-2">
          <div className="pl-4">Your Current Balance $ 00.00</div>

          <div className="pr-4">Withdrawals $ 00.00</div>
        </div>

        <div className="mb-6">
          {/* Add search bar here */}
          <div className="max-w-xl ">
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Withdrawal Earning
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                // readonly
                placeholder="Minimum Amount Should be 10$"
                className="flex-1 min-w-[250px] px-4 text-sm text-gray-600 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                style={{ height: '34px' }}
              />
              <button className="transition-opacity hover:opacity-90 cursor-pointer inline-block">
                <img 
                  src="/images/financial/Withdrawbutton.svg" 
                  alt="Withdraw" 
                  className="block"
                  style={{ height: '34px', width: '150px' }}
                />
              </button>
            </div>
          </div>

          {/* Horizontal Line */}
          <hr className="border-green-700 mb-1 mt-6" />

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Your History
            </h2>
          </div>

          {/* Horizontal Line */}
          <hr className="border-green-700 mb-4" />

          <div className="flex">
            <div
              className={`bg-white rounded-none ${
                payoutData.length > 0 ? "shadow" : ""
              } flex-1 overflow-x-auto rounded-lg`}
            >
              {/* Header (fixed, not scrollable) */}
              <table className="w-full table-fixed min-w-[600px]">
                <thead 
                  className="text-white relative"
                  style={{
                    backgroundImage: 'url(/images/financial/OrangesmallBand.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <tr>
                    <th className="w-12 px-4 py-3 text-left typo-table-head">
                      No
                    </th>
                    <th className="w-40 px-2 py-3 text-left typo-table-head">
                      Date
                    </th>
                    <th className="w-40 px-4 py-3 text-left typo-table-head">
                      Requested Amount
                    </th>
                    <th className="w-36 px-4 py-3 text-left typo-table-head">
                      Status
                    </th>
                  </tr>
                </thead>
              </table>

              {/* Scrollable body (only rows scroll) */}
              <div className="max-h-64 overflow-y-auto overflow-x-hidden">
                <table className="w-full table-fixed min-w-[600px]">
                  <tbody className="divide-y divide-gray-200">
                    {payoutData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-sm text-gray-500">
                          You haven't made any payout request yet.
                        </td>
                      </tr>
                    ) : (
                      payoutData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="w-12 px-4 py-3 typo-table-cell">
                            {index + 1}
                          </td>
                          <td className="w-40 px-2 py-3 typo-table-cell whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="w-40 px-4 py-3 typo-table-cell">
                            {item.requestedBy}
                          </td>
                          <td className="w-36 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                            $ {item.commission}.00
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Totals row */}
              {payoutData.length > 0 && (() => {
                const totalCommission = payoutData.reduce(
                  (acc, cur) => acc + Number(cur.commission || 0),
                  0
                );
                return (
                  <table className="w-full table-fixed mt-2 min-w-[600px]">
                    <tfoot>
                      <tr className="bg-purple-200">
                        <td className="w-12 px-4 py-3 typo-table-cell-strong">
                          Totals
                        </td>
                        <td className="w-40 px-2 py-3"></td>
                        <td className="w-40 px-4 py-3"></td>
                        <td className="w-36 px-4 py-3 typo-table-cell-strong whitespace-nowrap">
                          $ {totalCommission.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
