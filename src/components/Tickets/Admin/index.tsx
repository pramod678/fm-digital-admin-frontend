import * as React from "react";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../api/releaseInfo";
import { GetAllAdminTicketApi } from "../../../lib/endpoint";
import { BounceLoader } from "react-spinners";
import { GetAllUsersDataApi } from "../../../api/user";
import { stubTickets } from "../../../data/stubTickets";

export default function AdminTicketsIndex() {
  const [userData, setUserData] = React.useState<any>("");
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState("");
  const [statusId, setStatusId] = React.useState("");
  const [tickets, settickets] = React.useState<typeof stubTickets>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTicket, setSelectedTicket] = React.useState<any>(null);
  const [aiResponse, setAiResponse] = React.useState("");
  const [responseCharCount, setResponseCharCount] = React.useState(0);
  const [messages, setMessages] = React.useState<
    Array<{ text: string; sender: "user" | "support" }>
  >([
    {
      text: "Title name - Nannaadhariinchu Replace with - VUNNATHAMAINA RAAJYAPUYAASI Spotify\nlink: https://open.spotify.com/track/3wVBApea3LNSEiOfRtuEfM\nKindly change the name of this song.",
      sender: "user",
    },
    {
      text: "Your Ticket has been processed by our Team.\n\nSupport Team\nFM Digital Official (ASIA)",
      sender: "support",
    },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

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

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const formatDateTime = (value: string) => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return { date: formattedDate, time: formattedTime };
  };

  // Stub AI responses
  const stubAIResponses = [
    "Thank you for your query. We have received your request and our team will process it within 24-48 hours.",
    "Your request has been forwarded to the technical team. You will receive an update shortly.",
    "We appreciate your patience. The changes you requested are being reviewed by our quality assurance team.",
    "Your ticket has been escalated to our senior support team for faster resolution.",
    "Thank you for providing the details. We will update the information as requested and notify you once completed.",
    "We understand your concern. Our team is working on resolving this issue on priority.",
  ];

  const handleSendResponse = () => {
    if (aiResponse.trim() === "") return;
    const userMessage = {
      text: aiResponse,
      sender: "user" as const,
    };
    setMessages((prev) => [...prev, userMessage]);
    setAiResponse("");
    setResponseCharCount(0);
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse =
        stubAIResponses[Math.floor(Math.random() * stubAIResponses.length)];
      const supportMessage = {
        text: randomResponse,
        sender: "support" as const,
      };
      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendResponse();
    }
  };

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

          {/* Right: Edit icon + New Ticket button + Total count */}
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            {/* Edit icon */}
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            {/* + New Ticket */}
            <button className="flex items-center gap-2 px-4 py-1.5 text-green-600 font-medium text-sm border-2 border-green-500 rounded hover:bg-green-50 transition-colors whitespace-nowrap">
              <span className="text-lg font-bold">+</span>
              New Ticket
            </button>
            <p className="text-lg font-semibold text-black whitespace-nowrap">
              Total Tickets: {totalFilteredRecords || 0}
            </p>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-2 lg:-mx-2">
            <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-2">
              <div
                className="shadow border border-gray-200 sm:rounded-lg overflow-y-auto"
                style={{ maxHeight: "310px" }}
              >
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="w-10 px-2 py-3 text-left text-xs text-black font-semibold">
                        No.
                      </th>
                      <th scope="col" className="w-16 px-2 py-3 text-left text-xs text-black font-semibold">
                        User Id
                      </th>
                      <th scope="col" className="w-24 px-2 py-3 text-left text-xs text-black font-semibold">
                        User Name
                      </th>
                      <th scope="col" className="w-28 px-2 py-3 text-left text-xs text-black font-semibold">
                        Email
                      </th>
                      <th scope="col" className="w-28 px-2 py-3 text-left text-xs text-black font-semibold">
                        Reason
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-xs text-black font-semibold">
                        Description
                      </th>
                      <th scope="col" className="w-16 px-2 py-3 text-left text-xs text-black font-semibold">
                        Ticket Id
                      </th>
                      <th scope="col" className="w-20 px-2 py-3 text-left text-xs text-black font-semibold">
                        Attachment
                      </th>
                      <th scope="col" className="w-20 px-2 py-3 text-left text-xs text-black font-semibold">
                        Status
                      </th>
                      <th scope="col" className="w-24 px-2 py-3 text-left text-xs text-black font-semibold">
                        Action
                      </th>
                      <th scope="col" className="w-24 px-2 py-3 text-left text-xs text-black font-semibold">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {records?.length === 0 ? (
                      <tr className="w-full">
                        <td className="text-center py-4" colSpan={11}>
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
                              onRowClick={() => setSelectedTicket(data)}
                              isSelected={
                                selectedTicket?.ticket_id === data.ticket_id
                              }
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

        {/* Horizontal Line */}
        <hr className="border-gray-200 mt-4" />

        {/* Chat / Response Section */}
        <div className="p-2">
          <div className="chat-container mt-2 border-2 border-green-500 rounded-xl pl-4 pt-4 pr-4 pb-1 bg-white shadow-sm max-w-[1400px] mx-auto">
            {/* Header Row */}
            <div className="grid grid-cols-5 gap-4 items-start">
              <div className="text-[12px] text-gray-700">
                <div className="font-semibold">Ticket No.</div>
                <div className="mt-1">
                  {selectedTicket?.ticket_id || "4500"}
                </div>
              </div>
              <div className="text-[12px] text-gray-700 truncate text-center">
                {selectedTicket?.users?.[0]?.email || "User@gmail.com"}
              </div>
              <div className="text-[12px] text-gray-700 truncate text-center">
                {selectedTicket?.reason || "Change in Release"}
              </div>
              <div className="flex justify-center">
                <span className="px-3 py-[2px] bg-white border border-gray-400 text-gray-700 rounded text-[11px] font-medium">
                  {selectedTicket?.Status === 4 ? "DONE" : "Pending"}
                </span>
              </div>
              <div className="text-[12px] text-gray-700 text-right pr-12">
                {(() => {
                  const dt = formatDateTime(
                    selectedTicket?.created_at || "14/02/2025"
                  );
                  return (
                    <div className="leading-4">
                      <div>{dt.date}</div>
                      {dt.time && <div className="mt-[2px]">{dt.time}</div>}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Separator */}
            <div className="pr-12">
              <div className="border-t border-gray-200 my-3" />
            </div>

            {/* Chat Scroll Area */}
            <div className="relative">
              <div
                className="overflow-y-auto pr-12 mb-2 custom-scrollbar"
                style={{ maxHeight: "220px" }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } mb-3`}
                  >
                    <div
                      className={`${
                        message.sender === "user"
                          ? "bg-teal-300 text-gray-800"
                          : "bg-[#9791FF] text-white"
                      } text-[12px] rounded-lg px-4 py-${
                        message.sender === "user" ? "2" : "3"
                      } max-w-[75%] shadow whitespace-pre-line`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-[#9791FF] text-white text-[12px] rounded-lg px-4 py-3 max-w-[75%] shadow">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Response input area */}
              <div className="border-gray-200">
                <div className="flex items-end gap-3">
                  <div className="flex-1 pr-12">
                    <textarea
                      className="w-full h-12 p-2 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:ring-0 resize-none outline-none text-sm"
                      placeholder="Response..."
                      value={aiResponse}
                      onChange={(e) => {
                        setAiResponse(e.target.value);
                        setResponseCharCount(e.target.value.length);
                      }}
                      onKeyPress={handleKeyPress}
                      maxLength={1000}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center p-1 w-full mb-2">
                  <div className="flex flex-col sm:flex-row items-center gap-4"></div>
                  <div className="mt-4 sm:mt-0">
                    <span className="text-sm text-gray-400 mr-2">
                      {responseCharCount}/1000
                    </span>
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSendResponse}
                      disabled={aiResponse.trim() === "" || isTyping}
                      aria-label="Send Response"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
