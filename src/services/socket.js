import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "./config";

let socket;

export const connectSocket = (tenantId) => {
  socket = io(SOCKET_BASE_URL, {
    query: { tenantId },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;
