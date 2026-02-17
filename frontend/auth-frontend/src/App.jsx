import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="auth-wrapper">
      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h3>Authentication System</h3>

        <button className="side-btn" onClick={() => setPage("register")}>
          Register
        </button>
        <button className="side-btn" onClick={() => setPage("login")}>
          Login
        </button>
        <button className="side-btn" onClick={() => setPage("change")}>
          Change Password
        </button>
        <button className="side-btn" onClick={() => setPage("forgot")}>
          Forgot Password
        </button>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="content-area">
        <div className="content-card">
          {page === "register" && <Register />}
          {page === "login" && <Login setPage={setPage} />}
          {page === "change" && <ChangePassword />}
          {page === "forgot" && <ForgotPassword />}
        </div>
      </div>
    </div>
  );
}
