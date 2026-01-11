import { useState } from "react";

export default function ChangePassword() {
  const [data, setData] = useState({
    userId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const change = async () => {
    const res = await fetch("http://localhost:8080/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert(await res.text());
  };

  return (
    <div>
      <h2>Change Password</h2>

      <label>User ID:</label><br />
      <input
        type="text"
        onChange={e => setData({ ...data, userId: e.target.value })}
      />
      <br /><br />

      <label>Old Password:</label><br />
      <input
        type="password"
        onChange={e => setData({ ...data, oldPassword: e.target.value })}
      />
      <br /><br />

      <label>New Password:</label><br />
      <input
        type="password"
        onChange={e => setData({ ...data, newPassword: e.target.value })}
      />
      <br /><br />

      <label>Confirm Password:</label><br />
      <input
        type="password"
        onChange={e => setData({ ...data, confirmPassword: e.target.value })}
      />
      <br /><br />

      <button onClick={change}>SAVE</button>
    </div>
  );
}
