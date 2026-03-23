import * as React from "react";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../api/releaseInfo";
import { GetAllAdminTicketApi } from "../../../api/ticket";
import { BounceLoader } from "react-spinners";
import { GetAllUsersDataApi } from "../../../api/user";
import { stubTickets } from "../../../data/stubTickets";
import ChatLayout from "./ChatLayout";

export default function UserTicketsIndex() {
  const [userData, setUserData] = React.useState<any>("");
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState("");
  const [statusId, setStatusId] = React.useState("");
  type TicketType = {
    ticket_id: number;
    users_id: number;
    reason: string;
    discreption: string;
    ticketDocument: string;
    Status: number;
    created_at: string;
    users: { fname: string; lname: string; email: string; }[];
  };
  const [tickets, settickets] = React.useState<TicketType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showNewTicketForm, setShowNewTicketForm] = React.useState(false);

  const token = localStorage.getItem("token");
  const { data: allUsersData } = GetAllUsersDataApi();
  const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(
    setUserData,
    navigate
  );
  const {
    data: GetAllTicket,
    isLoading: isLoadingGetAllTicket,
    isFetching,
  } = GetAllAdminTicketApi(userId, statusId);

  React.useEffect(() => {
    getUserData({ token: token });
  }, []);

  React.useEffect(() => {
    if (GetAllTicket) {
      const ticketsData =
        GetAllTicket.data.data && GetAllTicket.data.data.length > 0
          ? GetAllTicket.data.data
          : stubTickets;
      settickets(ticketsData);
    } else {
      settickets(stubTickets);
    }
  }, [GetAllTicket]);

  const handleFilter = (event: any) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchTerm(inputValue);
  };

  const filterRecords = (data: any, term: any) => {
    return data.filter((row: any) => row?.reason.toLowerCase().includes(term));
  };

  const getFilteredData = () => {
    const filteredRecords = filterRecords(tickets, searchTerm);
    return {
      records: filteredRecords,
      totalFilteredRecords: filteredRecords.length,
    };
  };

  const { records, totalFilteredRecords } = getFilteredData();

  return (
    <>
      {(isLoadingGetAllTicket || isFetching) && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
          <BounceLoader size={150} color={"#000000"} />
        </div>
      )}
      <div className="p-4">
        {/* Top controls row */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-2">
          {/* Left: Search + Filter */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-400 text-sm"
              placeholder="Search Reason"
              value={searchTerm}
              onChange={handleFilter}
            />
            <select
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-400 text-sm"
              onChange={(e) => setStatusId(e.target.value)}
              value={statusId}
            >
              <option value="">All</option>
              <option value="4">Approved</option>
              <option value="0">Pending</option>
              <option value="2">Rejected</option>
            </select>
          </div>

          {/* Right: New Ticket button + Total count */}
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <button 
              className="flex items-center gap-2 px-4 py-1.5 text-green-600 font-medium text-sm border-2 border-green-500 rounded hover:bg-green-50 transition-colors whitespace-nowrap"
              onClick={() => setShowNewTicketForm(!showNewTicketForm)}
            >
              <span className="text-lg font-bold">+</span>
              New Ticket
            </button>
            <p className="text-lg font-semibold text-black whitespace-nowrap">
              Total Tickets: {totalFilteredRecords || 0}
            </p>
          </div>
        </div>

        {/* Green info banner */}
        <div className="flex justify-center items-center p-3 bg-gradient-to-r from-green-400 to-green-500 rounded-md shadow-sm w-full mb-4 text-white text-sm text-center">
          Due to high traffic of tickets, the response may vary from 24 hours to 1 week.
        </div>

        {/* Tickets Table */}
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-2 lg:-mx-2">
            <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-2">
              <div
                className="shadow border border-gray-200 sm:rounded-lg overflow-y-auto"
                style={{ maxHeight: "310px" }}
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 px-2 py-3 text-left text-xs text-black font-semibold uppercase"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-2 py-3 text-left text-xs text-black font-semibold"
                      >
                        Reason
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs text-black font-semibold"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="w-16 px-2 py-3 text-left text-xs text-black font-semibold"
                      >
                        Ticket Id
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-2 py-3 text-left text-xs text-black font-semibold"
                      >
                        Response by Team
                      </th>
                      <th
                        scope="col"
                        className="w-24 px-2 py-3 text-left text-xs text-black font-semibold"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="w-20 px-2 py-3 text-left text-xs text-black font-semibold"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 mt-2">
                    {records?.length === 0 ? (
                      <tr className="w-full">
                        <td className="text-center py-4" colSpan={7}>
                          No tickets found.
                        </td>
                      </tr>
                    ) : (
                      records?.map((data: any, index: any) => {
                        return (
                          <React.Fragment key={index}>
                            <ListRow
                              data={data}
                              index={index}
                            />
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* New Ticket Form (toggle) */}
        {showNewTicketForm && (
          <>
            <hr className="border-gray-200 mt-4" />
            <div className="p-2">
              <ChatLayout />
            </div>
          </>
        )}
      </div>
    </>
  );
}

