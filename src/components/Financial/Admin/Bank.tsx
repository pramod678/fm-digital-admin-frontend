// Bank.tsx
import * as React from "react";
import { useMemo } from "react";
import { ChevronDown } from 'lucide-react';

// Bank Page Component
const Bank = () => {
  const payoutRequests = [
    { amount: 25, requestedAmount: 148, date: '14/02/2025 10:33 PM', userId: '01', name: 'Name', email: 'User@gmail.com', phone: '+91 1234567891', subscriptionType: 'Solo Creator', status: 0, subscriptionColor: 'bg-red-600' },
  ];

  const history = [
    { approvedAmount: 25, availableAmount: 148, date: '14/02/2025 10:33 PM', userId: '01', name: 'Name', email: 'User@gmail.com', phone: '+91 1234567891', subscriptionType: 'Solo Creator', status: 4, subscriptionColor: 'bg-red-600' },
  ];

  // Calculate total requested amount for payout requests
  const totalRequestedAmount = useMemo(() => {
    return payoutRequests.reduce((sum, item) => sum + item.amount, 0);
  }, [payoutRequests]);

  // Calculate total approved amount for history
  const totalApprovedAmount = useMemo(() => {
    return history.reduce((sum, item) => sum + item.approvedAmount, 0);
  }, [history]);

  const statusButton = (status: any) => {
    switch (status) {
      case 0:
      case 2:
        return (
          <button
            type="button"
            className="px-3 py-1 text-center bg-white border border-black text-black typo-btn-action normal-case w-full"
          >
            Pending
          </button>
        );
      case 4:
        return (
          <button
            type="button"
            className="px-3 py-1 text-center bg-white border border-green-600 text-green-700 typo-btn-action normal-case w-full"
          >
            DONE
          </button>
        );
      default:
        return <></>;
    }
  };

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

        {/* Payout Requests Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Payout Requests
            </h2>
          </div>

          {/* Horizontal Line */}
          <hr className="border-gray-200 mb-4" />

          <div className="bg-white shadow overflow-x-auto rounded-lg">
            <table className="w-full min-w-[1000px]">
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
                  <th className="px-3 py-3 text-left typo-table-head">No</th>
                  <th className="px-3 py-3 text-left typo-table-head">Requested Amount</th>
                  <th className="px-3 py-3 text-left typo-table-head">Available Amount</th>
                  <th className="px-3 py-3 text-left typo-table-head">Date</th>
                  <th className="px-3 py-3 text-left typo-table-head">User ID</th>
                  <th className="px-3 py-3 text-left typo-table-head">User</th>
                  <th className="px-3 py-3 text-left typo-table-head">User Email</th>
                  <th className="px-3 py-3 text-left typo-table-head">Phone Number</th>
                  <th className="px-3 py-3 text-left typo-table-head">Subscription Type</th>
                  <th className="px-3 py-3 text-left typo-table-head">Status</th>
                  <th className="px-3 py-3 text-left typo-table-head">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payoutRequests.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-3 typo-table-cell">{index + 1}</td>
                    <td className="px-3 py-3 typo-table-cell-strong">$ {item.amount}.00</td>
                    <td className="px-3 py-3 typo-table-cell">{item.requestedAmount}</td>
                    <td className="px-3 py-3 typo-table-cell whitespace-nowrap">{item.date}</td>
                    <td className="px-3 py-3 typo-table-cell">{item.userId}</td>
                    <td className="px-3 py-3 typo-table-cell">{item.name}</td>
                    <td className="px-3 py-3 typo-table-cell">{item.email}</td>
                    <td className="px-3 py-3 typo-table-cell whitespace-nowrap">{item.phone}</td>
                    <td className="px-3 py-3 typo-table-cell">
                      <span className={`${item.subscriptionColor} text-white px-3 py-1 rounded text-[10px] font-bold`}>
                        {item.subscriptionType}
                      </span>
                    </td>
                    <td className="px-3 py-3 typo-table-cell">
                      {statusButton(item.status)}
                    </td>
                    <td className="px-2 py-3 typo-table-cell">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded typo-btn-action normal-case w-full"
                          onClick={() => {
                            console.log("Approve is clicked")
                          }}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded typo-btn-action normal-case w-full"
                          onClick={() => {
                            console.log("Reject is clicked")
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payout Requests Totals */}
          <div className="bg-purple-200 px-3 py-3 flex items-center gap-4 w-fit rounded-lg mb-8">
            <span className="typo-table-cell-strong font-semibold text-gray-800">Totals</span>
            <span className="typo-table-cell-strong">$ {totalRequestedAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* History Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              History
            </h2>
          </div>

          {/* Horizontal Line */}
          <hr className="border-gray-200 mb-4" />

          {/* Search */}
          <div className="mb-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded bg-white text-sm appearance-none focus:outline-none focus:border-gray-300"
              style={{
                backgroundImage: `linear-gradient(to bottom,rgb(180, 188, 201),rgb(159, 166, 175)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundPosition: 'calc(100% - 40px) center, center right 12px',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: '1px 60%, auto',
                paddingRight: '48px'
              }}
            >
              <option className="text-gray-500">Search User Id/Name</option>
            </select>
          </div>

          <div className="bg-white shadow overflow-x-auto rounded-lg">
            <table className="w-full min-w-[1000px]">
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
                  <th className="px-3 py-3 text-left typo-table-head">No</th>
                  <th className="px-3 py-3 text-left typo-table-head">Approved Amount</th>
                  <th className="px-3 py-3 text-left typo-table-head">Available Amount</th>
                  <th className="px-3 py-3 text-left typo-table-head">Date</th>
                  <th className="px-3 py-3 text-left typo-table-head">User ID</th>
                  <th className="px-3 py-3 text-left typo-table-head">User</th>
                  <th className="px-3 py-3 text-left typo-table-head">User Email</th>
                  <th className="px-3 py-3 text-left typo-table-head">Phone Number</th>
                  <th className="px-3 py-3 text-left typo-table-head">Subscription Type</th>
                  <th className="px-3 py-3 text-left typo-table-head">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-3 typo-table-cell">{index + 1}</td>
                    <td className="px-3 py-3 typo-table-cell-strong">$ {item.approvedAmount}.00</td>
                    <td className="px-3 py-3 typo-table-cell">{item.availableAmount}</td>
                    <td className="px-3 py-3 typo-table-cell whitespace-nowrap">{item.date}</td>
                    <td className="px-3 py-3 typo-table-cell">{item.userId}</td>
                    <td className="px-3 py-3 typo-table-cell">{item.name}</td>
                    <td className="px-3 py-3 typo-table-cell">{item.email}</td>
                    <td className="px-3 py-3 typo-table-cell whitespace-nowrap">{item.phone}</td>
                    <td className="px-3 py-3 typo-table-cell">
                      <span className={`${item.subscriptionColor} text-white px-3 py-1 rounded text-[10px] font-bold`}>
                        {item.subscriptionType}
                      </span>
                    </td>
                    <td className="px-3 py-3 typo-table-cell">
                      {statusButton(item.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* History Totals */}
          <div className="bg-purple-200 px-3 py-3 flex items-center gap-4 w-fit rounded-lg">
            <span className="typo-table-cell-strong font-semibold text-gray-800">Total Approved Amount</span>
            <span className="typo-table-cell-strong">$ 550.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
