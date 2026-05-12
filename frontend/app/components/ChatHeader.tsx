import { User } from "../context/AppContext";
import { Menu, UserCircle } from "lucide-react";

interface ChatHeaderProps {
  user: User | null;
  setSidebarOpen: (open: boolean) => void;
  isTyping: boolean;
}
const ChatHeader = ({ user, setSidebarOpen, isTyping }: ChatHeaderProps) => {
  console.log(user);
  return (
    <>
      <div className=" sm:hidden fixed top-4 right-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <Menu className="w-5 h-5 text-gray-200" />
        </button>
      </div>

      <div className="mb-6 bg-gray-800 border-gray-700 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div>
                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              <div className="flex-1 min-w-0 justify-start">
                <div className="flex items-center justify-start gap-3 mb-1 ">
                  <h2 className="text-sm font-semibold text-gray-400">
                    {user.name}
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full  bg-gray-700  flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-gray-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-400">
                  Select a conversation
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Choose a chat from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
