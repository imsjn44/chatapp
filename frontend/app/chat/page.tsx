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
import { SocketData } from "../context/SocketContext";

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
  const { onlineUsers, socket } = SocketData();
  // console.log(onlineUsers);
  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  });

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

    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
      setTypingTimeOut(null);
    }

    socket?.emit("stopTyping", {
      chatId: selectedUser,
      userId: loggedInUser?._id,
    });
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

  const handleTyping = (value: string) => {
    setMessage(value);
    if (!selectedUser || !socket) return;
    if (value.trim()) {
      socket.emit("typing", {
        chatId: selectedUser,
        userId: loggedInUser?._id,
      });
    }

    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
    }

    const timeout = setTimeout(() => {
      socket.emit("stopTyping", {
        chatId: selectedUser,
        userId: loggedInUser?._id,
      });
    }, 2000);
    setTypingTimeOut(timeout);
  };

  socket?.on("messagesSeen", (data) => {
    console.log("Message seen by:", data);

    if (selectedUser == data.chatId) {
      setMessages((prev: any) => {
        if (!prev) return null;
        return prev.map((msg: any) => {
          if (
            msg.sender === loggedInUser?._id &&
            data.messageIds &&
            data.messageIds.includes(msg._id)
          ) {
            return {
              ...msg,
              seen: true,
              seenAt: new Date().toString(),
            };
          } else if (msg.sender === loggedInUser?._id && !data.messageId) {
            return {
              ...msg,
              seen: true,
              seenAt: new Date().toString(),
            };
          }
          return msg;
        });
      });
    }
  });
  useEffect(() => {
    socket?.on("userTyping", (data) => {
      console.log(`Received user typing`, data);
      if (data.chatId === selectedUser && data.userId !== loggedInUser?._id) {
        setIsTyping(true);
      }
    });

    socket?.on("userStoppedTyping", (data) => {
      console.log(`Received user stopping typing`, data);
      if (data.chatId === selectedUser && data.userId !== loggedInUser?._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket?.off("messagesSeen");
      socket?.off("userTyping");
      socket?.off("userStoppedTyping");
    };
  }, [socket, selectedUser, loggedInUser?._id]);

  useEffect(() => {
    if (selectedUser) {
      fetchChats();
      setIsTyping(false);
      socket?.emit("joinChat", selectedUser);
      return () => {
        socket?.emit("leaveChat", selectedUser);
        setMessages(null);
      };
    }
  }, [selectedUser, socket]);

  useEffect(() => {
    return () => {
      if (typingTimeOut) {
        clearTimeout(typingTimeOut);
      }
    };
  }, [typingTimeOut]);

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
        onlineUsers={onlineUsers}
      />
      <div className="flex flex-1 flex-col justify-between p-4">
        <ChatHeader
          user={user}
          setSidebarOpen={setSidebarOpen}
          isTyping={isTyping}
          onlineUsers={onlineUsers}
        />
        <ChatMessage
          selectedUser={selectedUser}
          messages={messages}
          loggedInUser={loggedInUser}
        />
        <MessageInput
          selectedUser={selectedUser}
          message={message}
          setMessage={handleTyping}
          handleMessageSend={handleMessageSend}
        />
      </div>
    </div>
  );
};

export default chatApp;
