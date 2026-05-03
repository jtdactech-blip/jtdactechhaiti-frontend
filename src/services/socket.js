//frontend/src/services/socket.js

import { io } from "socket.io-client";

let socket;

export const connectSocket = (tenantId) => {
  socket = io("http://localhost:3000", {
    query: { tenantId },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  }); 

  socket = io("http://localhost:3000", {
  query: { tenantId },
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

  return socket;
};

export const getSocket = () => socket;