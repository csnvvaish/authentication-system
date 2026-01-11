import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="container">
      <h1>Authentication System</h1>

      {}
      <div className="nav-bar">
        <button className="nav-btn" onClick={() => setPage("register")}>
          Register
        </button>
        <button className="nav-btn" onClick={() => setPage("login")}>
          Login
        </button>
        <button className="nav-btn" onClick={() => setPage("change")}>
          Change Password
        </button>
        <button className="nav-btn" onClick={() => setPage("forgot")}>
          Forgot Password
        </button>
      </div>

      {}
      <div className="content">
        {page === "register" && <Register />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "change" && <ChangePassword />}
        {page === "forgot" && <ForgotPassword />}
      </div>
    </div>
  );
}
