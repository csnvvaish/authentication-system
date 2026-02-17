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

    // ✅ CLEAR FIELDS AFTER CHANGE (REQUIRED FIX)
    setData({
      userId: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div>
      <h2>Change Password</h2>

      <label>User ID</label>
      <input
        type="text"
        value={data.userId}
        onChange={e => setData({ ...data, userId: e.target.value })}
      />

      <label>Old Password</label>
      <input
        type="password"
        value={data.oldPassword}
        onChange={e => setData({ ...data, oldPassword: e.target.value })}
      />

      <label>New Password</label>
      <input
        type="password"
        value={data.newPassword}
        onChange={e => setData({ ...data, newPassword: e.target.value })}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        value={data.confirmPassword}
        onChange={e => setData({ ...data, confirmPassword: e.target.value })}
      />

      <div className="actions">
        <button onClick={change}>SAVE</button>
      </div>
    </div>
  );
}
