"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppData } from "./AppContext";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

interface ProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: ProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAppData();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io(process.env.NEXT_PUBLIC_CHAT_SERVICE, {
      query: {
        userId: user._id,
      },
    });
    setSocket(newSocket);

    newSocket.on("getOnlineUser", (user: string[]) => {
      setOnlineUsers(user);
    });
    return () => {
      newSocket.disconnect();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketData = () => useContext(SocketContext);
