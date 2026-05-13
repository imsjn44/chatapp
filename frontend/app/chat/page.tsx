"use client";
import { useEffect, useState } from "react";
import { chat_service, useAppData, User } from "../context/AppContext";
import { useRouter } from "next/navigation";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "../components/MessageInput";

export interface Message {
  _id: string;
  chatId: string;
  sender: string;
  text?: string;
  image: {
    url: string;
    publicId: string;
  };
  messageType: "text" | "image";
  seen: boolean;
  seenAt?: string;
  createdAt: string;
}
const chatApp = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAllUser, setShowAllUser] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(
    null,
  );
  const {
    isAuth,
    loading,
    logOutUser,
    chats,
    user: loggedInUser,
    users,
    fetchChats,
    setChats,
  } = useAppData();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isAuth && !loading) {
  //     router.push("/login");
  //   }
  // });

  const handleLogOut = () => logOutUser();

  async function fetchChat() {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.get(
        `${chat_service}/api/v1/message/${selectedUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessages(data.messages);
      setUser(data.user);
      await fetchChats();
    } catch (error) {}
  }
  async function createChat(u: User) {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${chat_service}/api/v1/chat/new`,
        {
          userId: loggedInUser?._id,
          otherUserId: u._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSelectedUser(data.chatId);
      setShowAllUser(false);
      await fetchChats();
    } catch (error) {
      toast.error("Failed to start chat");
    }
  }

  const handleMessageSend = async (e: any, imageFile?: File | null) => {
    e.preventDefault();
    if (!message.trim() && !imageFile) return;
    if (!selectedUser) return;

    //socket work

    try {
      const token = Cookies.get("token");

      const formData = new FormData();
      formData.append("chatId", selectedUser);

      if (message.trim()) {
        formData.append("text", message);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.post(
        `${chat_service}/api/v1/message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setMessages((prev: any) => {
        const currentMessage = prev || [];
        const messageExists = currentMessage.some(
          (msg: any) => msg._id === data.message._id,
        );

        if (!messageExists) {
          return [...currentMessage, data.message];
        }
        return currentMessage;
      });

      setMessage("");
      const displayText = imageFile ? "image" : "message";
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (selectedUser) {
      fetchChat();
    }
  }, [selectedUser]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        showAllUsers={showAllUser}
        setShowAllUsers={setShowAllUser}
        users={users}
        chats={chats}
        loggedInUser={loggedInUser}
        handleLogOut={handleLogOut}
        createChat={createChat}
      />
      <div className="flex flex-1 flex-col justify-between p-4">
        <ChatHeader
          user={user}
          setSidebarOpen={setSidebarOpen}
          isTyping={isTyping}
        />
        <ChatMessage
          selectedUser={selectedUser}
          messages={messages}
          loggedInUser={loggedInUser}
        />
        <MessageInput
          selectedUser={selectedUser}
          message={message}
          setMessage={setMessage}
          handleMessageSend={handleMessageSend}
        />
      </div>
    </div>
  );
};

export default chatApp;
