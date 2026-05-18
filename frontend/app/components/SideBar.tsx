import { useState } from "react";
import { User } from "../context/AppContext";
import {
  CornerDownLeft,
  CornerDownRight,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";

interface ChatSideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showAllUsers: boolean;
  setShowAllUsers: (show: boolean | ((prev: boolean) => boolean)) => void;
  users: User[] | null;
  loggedInUser: User | null;
  chats: any[] | null;
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  handleLogOut: () => void;
  createChat: (user: User) => void;
  onlineUsers: string[];
}
const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
  showAllUsers,
  setShowAllUsers,
  users,
  chats,
  selectedUser,
  setSelectedUser,
  handleLogOut,
  loggedInUser,
  createChat,
  onlineUsers,
}: ChatSideBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  console.log(onlineUsers);

  return (
    <aside
      className={`fixed z-20 sm:static top-0 left-0 h-screen w-80 bg-gray-900 border-r border-gray-700 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 transition transform duration-300 flex flex-col `}
    >
      <div className=" p-6 border-b border-gray-700 block ">
        <div className="flex justify-end mb-0">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-900 transition-colors rounded-lg"
          >
            <X className="w-5 h-5 text-gray-900 hover:text-gray-500" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600  p-2 rounded-lg">
              <MessageCircle />
            </div>
            <h2 className="text-sm font-bold text-white ml-0">
              {showAllUsers ? "New Chat" : "Messages"}
            </h2>
          </div>
          <button
            className={`rounded-lg p-2.5 transition-colors ${showAllUsers ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
            onClick={() => setShowAllUsers((prev) => !prev)}
          >
            {showAllUsers ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 py-2">
        {showAllUsers ? (
          <div className="space-y-4 h-full">
            <div className="relative">
              <Search className="absolute w-4 h-4 left-3 text-gray-300 top-1/2 transform -translate-y-2" />
              <input
                type="text"
                placeholder="Search users"
                className="w-full pl-10 pr-4 py-3 bg-gray-800  border-r border-gray-700  text-white placeholder-gray-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              {users
                ?.filter(
                  (u) =>
                    u._id !== loggedInUser?._id &&
                    u.name
                      .toLowerCase()
                      .includes(searchQuery.toLocaleLowerCase()),
                )
                .map((u) => (
                  <button
                    key={u._id}
                    className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors hover:bg-gray-800 mt-2"
                    onClick={() => createChat(u)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <UserCircle />
                        {onlineUsers.includes(u._id) && (
                          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-600 border-2  border-gray-500"></span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-white font-medium">{u.name}</span>
                        <div className="text-xs text-gray-600">
                          {onlineUsers.includes(u._id) ? "Online" : "Offline"}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ) : chats && chats.length > 0 ? (
          <div>
            {chats.map((chat) => {
              const latestMessage = chat.chat.latestMessage;

              const isSelected = selectedUser === chat.chat._id;
              const isSentByMe = latestMessage?.sender === loggedInUser?._id;
              const unseenMsgCount = chat.chat.unseenMsgCount || 0;
              return (
                <button
                  key={chat.chat._id}
                  onClick={() => {
                    setSelectedUser(chat.chat._id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${isSelected ? "bg-blue-600 border-blue-500" : "border border-gray-700 hover:border-gray-600"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                        <UserCircle className={`w-7 h-7 text-white relative`} />
                      </div>
                      {onlineUsers.includes(chat.user._id) && (
                        <span className="absolute top-1.5 -right-.3 w-3.5 h-3.5 rounded-full bg-green-600 border-2  border-gray-500"></span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`fon
      
                              t-semibold ${isSelected ? "text-white " : "text-gray-500"}`}
                          >
                            {chat.user.name}
                          </span>
                          {unseenMsgCount > 0 && (
                            <div className="bg-red-600 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 flex items-center justify-center px-2">
                              {unseenMsgCount > 99 ? "99+" : unseenMsgCount}
                            </div>
                          )}
                        </div>

                        {latestMessage && (
                          <div className="flex items-center gap-5">
                            {isSentByMe ? (
                              <CornerDownLeft
                                className="text-blue-600 text-shrink-0"
                                size={12}
                              />
                            ) : (
                              <CornerDownRight
                                className="text-green-600 text-shrink-0"
                                size={14}
                              />
                            )}

                            <span className="text-sm text-gray-400">
                              {latestMessage.text}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex  flex-col items-center justify-center h-full text-center ">
            <div className="p-4 bg-gray-800 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 font-medium">No conversation yet.</p>
            <p className="text-sm text-gray-500 mt-1">
              Start a new chat to begin messaging
            </p>
          </div>
        )}
      </div>

      {/* footer */}

      <div className="border-t p-4 border-gray-600 ">
        <Link
          href={"/profile"}
          className="flex items-center gap-3 px-4 py-3 rounded-lg"
        >
          <div className="p-1.5 rounded-lg text-gray-500 mb-3 flex justify-center gap-3 bg-gray-800 w-full hover:bg-gray-700">
            <UserCircle className="w-6 h-6 text-gray-400" />
            {loggedInUser?.name}
          </div>
        </Link>
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg  transition-colors text-gray-500 hover:text-gray-400 cursor-pointer "
        >
          <div className="p-1 bg-gray-500 rounded-lg">
            <LogOut className="w-4 h-4 text-gray-300" />
          </div>
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
