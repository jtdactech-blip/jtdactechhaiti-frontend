import { useMemo, useState } from "react";

import useSocket from "../hooks/useSocket";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useSocket({
    notification: (payload) => {
      setNotifications((current) => [
        {
          id: `${Date.now()}-${current.length}`,
          title: payload?.title || "Nouvelle notification",
          message: payload?.message || "Ou gen yon nouvo alèt.",
          time: new Date().toLocaleTimeString(),
          read: false,
        },
        ...current,
      ]);
    },
  });

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      })),
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          markAllRead();
        }}
        className="btn-soft"
        style={{ position: "relative", minWidth: 54 }}
      >
        Bell
        {unreadCount ? (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              width: 20,
              height: 20,
              borderRadius: 999,
              background: "#dc2626",
              color: "#fff",
              fontSize: 12,
              display: "grid",
              placeItems: "center",
            }}
          >
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? <NotificationDropdown notifications={notifications} onClear={markAllRead} /> : null}
    </div>
  );
}
