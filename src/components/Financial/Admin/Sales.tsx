import * as React from "react";

// Sales.tsx

interface ISale {
  store?: string;
  storeName: string;
  saleType: string;
  userType: string;
  territory: string;
  productLabel: string;
  album: string;
  song: string;
  artist: string;
  impressions: string;
  grossIncome: string;
  contractTerm: string;
  reportedRoyalty: string;
  currency: string;
  reportRunId: string;
  runId: string;
}

export default function Sales() {
  // Mock data from image
  const salesData: ISale[] = [
    {
      store: "DSP",
      storeName: "Sale Store Name",
      saleType: "Sale Type",
      userType: "Sale User Type",
      territory: "Territory",
      productLabel: "Product Label",
      album: "Album Title",
      song: "Song Title",
      artist: "Song Artist",
      impressions: "Streams/Impressions/Views",
      grossIncome: "Converted Gross Income",
      contractTerm: "Contract Term",
      reportedRoyalty: "Reported Royalty",
      currency: "Currency",
      reportRunId: "Report Run ID",
      runId: "Run ID",
    },
    // Add more rows as needed
  ];

  const reportHistory: ISale[] = [
    // Mock empty or add data
  ];

  return (
    <div className="pt-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex  pt-1 mb-2 w-3/5    ">
          <div className="text-[14.6px] pr-16">
            View your detailed royalty earnings here. Please note, some
            platforms report sales with adelay of up to 3 months. To ensure
            accuracy we display last 6 months of royalty data.
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full m-2">
        <div className="flex  items-center space-x-2 w-1/2">
          <div className="flex-1  border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-center cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="cursor-pointer block">
              <span className="text-teal-600 font-medium">
                Select a .csv, or .xlsx
              </span>
              <br />
              <span className="text-gray-500 text-sm">
                Upload or Drop files here
              </span>
            </label>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Upload Now
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex-1 overflow-x-auto mb-6 rounded-lg shadow">
          <table className="min-w-[1800px] w-full bg-white">
            <thead className="text-white bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left typo-table-head">
                  Sales Month
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  DSP
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Sale Store Name
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Sale Type
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Sale User Type
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Territory
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Product Label
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Album Title
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Song Title
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Song Artist
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Streams/Impressions/Views
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Converted Gross Income
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Contract deal term
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Reported Royalty
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Currency
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Report Run ID
                </th>
                <th className="px-4 py-3 text-left typo-table-head">
                  Report ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 typo-table-cell">
                    Sales Month
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.store}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.storeName }
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.saleType}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.userType}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.territory}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.productLabel}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.album}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.song}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.artist}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.impressions}
                  </td>
                  <td className="px-4 py-3 typo-table-cell-strong">
                    $ {row.grossIncome}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.contractTerm}
                  </td>
                  <td className="px-4 py-3 typo-table-cell-strong">
                    $ {row.reportedRoyalty}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.currency}
                  </td>
                   <td className="px-4 py-3 typo-table-cell">
                    {row.reportRunId}
                  </td>
                  <td className="px-4 py-3 typo-table-cell">
                    {row.runId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Download Report
          </button>
        </div>
      </div>

      <div className="mt-4 h-[20vh]">
        <h3 className="font-semibold mb-2">User Sales</h3>
        {/* Horizontal Line */}
        <hr className="border-gray-200 mb-8" />
      </div>

      <div className="mt-4 h-[20vh]">
        <h3 className="font-semibold mb-2">Report History</h3>
        {/* Horizontal Line */}
        <hr className="border-gray-200 mb-8" />
      </div>
    </div>
  );
}
