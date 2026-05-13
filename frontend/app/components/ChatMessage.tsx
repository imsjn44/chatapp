import React, { useEffect, useMemo, useRef } from "react";
import { Message } from "../chat/page";
import { User } from "../context/AppContext";
import { CheckCheck } from "lucide-react";

interface ChatMessageProps {
  selectedUser: string | null;
  messages: Message[] | null;
  loggedInUser: User | null;
}

const ChatMessage = ({
  selectedUser,
  messages,
  loggedInUser,
}: ChatMessageProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const uniqueMessages = useMemo(() => {
    if (!messages) return [];
    const seen = new Set();
    return messages.filter((message) => {
      if (seen.has(message._id)) return false;
      seen.add(message._id);
      return true;
    });
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser, uniqueMessages]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full max-h-[calc(100vh-215px)] overflow-y-auto p-4 space-y-4 custom-scroll mt-35">
        {!selectedUser ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-400 text-center">
              Please select a user to start chatting 📤
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {uniqueMessages.map((e) => {
              const isSentByMe = e.sender === loggedInUser?._id;

              return (
                <div
                  key={e._id}
                  className={`flex flex-col ${isSentByMe ? "items-end" : "items-start"}`}
                >
                  {/* Message Bubble Container */}
                  <div
                    className={`rounded-lg p-2 max-w-sm shadow-sm ${
                      isSentByMe
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-100 rounded-bl-none"
                    }`}
                  >
                    {/* Image handling */}
                    {e.messageType === "image" && e.image && (
                      <div className="relative group mb-1">
                        <img
                          src={e.image.url}
                          alt="shared image"
                          className="rounded-lg h-auto max-w-full block"
                        />
                      </div>
                    )}

                    {e.text && (
                      <p className="text-sm px-1 whitespace-pre-wrap">
                        {e.text}
                      </p>
                    )}

                    {isSentByMe && (
                      <div className="flex justify-end mt-1">
                        <CheckCheck
                          size={16}
                          className={e.seen ? "text-blue-200" : "text-gray-400"}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[10px] text-gray-500">
                      {e.createdAt
                        ? `${new Date(e.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })}, ${new Date(e.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                        : ""}
                    </span>
                    {isSentByMe && e.seen && e.seenAt && (
                      <span className="text-[9px] text-gray-400 italic">
                        Seen{" "}
                        {new Date(e.seenAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {new Date(e.seenAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Scroll Anchor */}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
