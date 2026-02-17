import { useState } from "react";

export default function Login({ setPage }) {
  const [data, setData] = useState({
    userId: "",
    password: ""
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();

    if (res.ok) {
      setMessage(text);
      setLoggedIn(true);
    } else {
      setMessage(text);
    }
  };

  /* ======================
     SUCCESS SCREEN
  ====================== */
  if (loggedIn) {
    return (
      <div className="login-success-page">
        <h2>{message || "Login Successful"}</h2>
        <button
          onClick={() => {
            setLoggedIn(false);
            setData({ userId: "", password: "" });
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  /* ======================
     LOGIN FORM
  ====================== */
  return (
    <div>
      <h2>Login</h2>

      <label>User ID</label>
      <input
        type="text"
        value={data.userId}
        onChange={e => setData({ ...data, userId: e.target.value })}
      />

      <label>Password</label>
      <input
        type="password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <div className="actions">
        <button onClick={login}>LOGIN</button>
      </div>

      <div className="login-actions">
        <button onClick={() => setPage("change")}>
          Change Password
        </button>
        <button onClick={() => setPage("forgot")}>
          Forgot Password
        </button>
      </div>
    </div>
  );
}
