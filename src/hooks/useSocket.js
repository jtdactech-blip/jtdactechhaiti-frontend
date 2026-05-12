import { useEffect, useMemo, useState } from "react";

import { connectSocket, getSocket } from "../services/socket";

export default function useSocket(handlers = {}) {
  const [socket, setSocket] = useState(() => getSocket());
  const entries = useMemo(() => Object.entries(handlers), [handlers]);

  useEffect(() => {
    const tenantId = localStorage.getItem("tenantId") || "1";
    const nextSocket = getSocket() || connectSocket(tenantId);
    setSocket(nextSocket);

    entries.forEach(([eventName, handler]) => {
      if (typeof handler === "function") {
        nextSocket.on(eventName, handler);
      }
    });

    return () => {
      entries.forEach(([eventName, handler]) => {
        if (typeof handler === "function") {
          nextSocket.off(eventName, handler);
        }
      });
    };
  }, [entries]);

  return socket;
}
