import { useState } from "react";
import API from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.data.access_token);
    localStorage.setItem("refresh_token", res.data.data.refresh_token);

    if (res.data.data.user?.tenantId) {
      localStorage.setItem("tenantId", String(res.data.data.user.tenantId));
    }

    window.location.href = "/dashboard";
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Login</h1>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}
