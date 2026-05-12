import { useEffect } from "react";

import { connectSocket } from "./services/socket";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const tenantId = localStorage.getItem("tenantId") || 1;
    connectSocket(tenantId);
  }, []);

  return (
    <AppRoutes />
  );
}

export default App;
