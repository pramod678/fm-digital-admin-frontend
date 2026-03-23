import * as React from "react";
import { ChevronDown } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";

// Payouts Page Component
const Sales = () => {
  const [activeTab, setActiveTab] = React.useState("fund");

  interface Sales {
    reportingMonth?: string;
    saleMonth?: string;
    label?: string;
    earning?: number;
    report?: string;
    status?: number;
  }

  const salesData: Sales[] = [
   {
      reportingMonth: "July 2025",
      saleMonth: "March 2025",
      label: "KP Music",
      earning: 50,
      report: "Download",
      status: 0
   },
   {
      reportingMonth: "June 2025",
      saleMonth: "February 2025",
      label: "RD Parmar",
      earning: 80,
      report: "Download",
      status: 1
   },


  ];


    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <button
                        type="button"
                        className="py-1 px-3 text-center bg-white border border-black text-black typo-btn-action normal-case w-full"
                    >
                        Pending
                    </button>
                );
            case 1:
                return (
                     <button
                        type="button"
                        className="py-1 px-3 text-center bg-white border border-green-600 text-green-600 typo-btn-action normal-case w-full"
                    >
                        RECEIVED
                    </button>
                );
            case 4:
                return (
                    <button
                        type="button"
                        className="py-1 px-3 text-center bg-white border border-green-600 text-green-700 typo-btn-action normal-case w-full"
                    >
                        DONE
                    </button>
                );
            default:
                return <></>;
        }
    };

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
            View your detailed royalty earnings here. Please note, some platforms report 
            sales with a delay of up to 3 months. To ensure accuracy, we display the last 
            6 months of royalty data.
          </div>
        </div>

       

       

        <div className="mb-6">
          

          {/* Horizontal Line */}
          <hr className="border-green-700 mb-1 mt-6" />

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Your History
            </h2>
          </div>

          {/* Horizontal Line */}
          <hr className="border-green-700 mb-4" />

          <div
            className={`bg-white rounded-none ${
              salesData.length > 0 ? "shadow" : ""
            } flex-1 overflow-x-auto rounded-lg`}
          >
            <table className="w-full min-w-[800px]">
              <thead 
                className="text-white relative"
                style={{
                  backgroundImage: 'url(/images/financial/OrangeBigBand.svg)',
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <tr>
                  <th className="px-4 py-3 text-left typo-table-head w-[6%]">
                    No
                  </th>
                  <th className="px-4 py-3 text-left typo-table-head w-[18%]">
                    Reporting Month
                  </th>
                  <th className="px-4 py-3 text-left typo-table-head w-[18%]">
                    Sale Month
                  </th>
                  <th className="px-4 py-3 text-left typo-table-head w-[20%]">
                    Label
                  </th>
                  <th className="px-4 py-3 text-left typo-table-head w-[14%]">
                    Earning
                  </th>
                  <th className="px-4 py-3 text-left typo-table-head w-[12%]">
                    Report
                  </th>
                  <th className="px-4 py-3 text-left typo-table-head w-[12%]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-sm text-gray-500">
                      No sales data available yet.
                    </td>
                  </tr>
                ) : (
                  salesData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 typo-table-cell">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 typo-table-cell">
                        {item.reportingMonth}
                      </td>
                      <td className="px-4 py-3 typo-table-cell">
                        {item.saleMonth}
                      </td>
                      <td className="px-4 py-3 typo-table-cell">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 typo-table-cell-strong">
                        $ {item.earning}.00
                      </td>
                      <td className="px-4 py-3 typo-table-cell">
                        {item.report}
                      </td>
                      <td className="px-4 py-3 typo-table-cell">
                        {statusButton(item.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
