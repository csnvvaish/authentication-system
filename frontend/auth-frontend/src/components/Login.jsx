import { useState } from "react";

export default function Login({ setPage }) {
  const [data, setData] = useState({
    userId: "",
    password: ""
  });

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const text = await res.text();
    alert(text);
  };

  return (
    <div>
      <h2>LOGIN</h2>

      <label>User ID:</label><br />
      <input
        type="text"
        onChange={e => setData({ ...data, userId: e.target.value })}
      />
      <br /><br />

      <label>Password:</label><br />
      <input
        type="password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />
      <br /><br />

      <button onClick={login}>LOGIN</button>

      <br /><br />

      <div>
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
