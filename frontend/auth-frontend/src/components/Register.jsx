import { useState } from "react";

export default function Register() {
  const initialUserState = {
    userId: "",
    username: "",
    dob: "",
    password: "",
    question1: "",
    answer1: "",
    question2: "",
    answer2: ""
  };

  const [user, setUser] = useState(initialUserState);
  const [q1Type, setQ1Type] = useState("");
  const [q2Type, setQ2Type] = useState("");

  const register = async () => {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const msg = await res.text();
    alert(msg);

    setUser(initialUserState);
    setQ1Type("");
    setQ2Type("");
  };

  return (
    <div>
      <h2>User Registration</h2>

      <div className="form-grid-2">
        <label>User ID</label>
        <input
          type="text"
          value={user.userId}
          onChange={e => setUser({ ...user, userId: e.target.value })}
        />

        <label>Username</label>
        <input
          type="text"
          value={user.username}
          onChange={e => setUser({ ...user, username: e.target.value })}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          value={user.dob}
          onChange={e => setUser({ ...user, dob: e.target.value })}
        />

        <label>Create Password</label>
        <input
          type="password"
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
        <small style={{ color: "#555", marginBottom: "12px" }}>
          Password must be 8–12 chars, alphanumeric, 1 special char, 1 capital letter
        </small>

        <label>Security Question 1</label>
        <select
          value={q1Type}
          onChange={e => {
            const val = e.target.value;
            setQ1Type(val);
            setUser({
              ...user,
              question1: val === "other" ? "" : val
            });
          }}
        >
          <option value="">-- Select a question --</option>
          <option value="nickname">What is your Nickname?</option>
          <option value="school">What is your First School Name?</option>
          <option value="birthplace">What is your Place of Birth?</option>
          <option value="age">What is your Age?</option>
          <option value="other">Other</option>
        </select>

        {q1Type === "other" && (
          <>
            <label>Custom Question 1</label>
            <input
              type="text"
              value={user.question1}
              onChange={e =>
                setUser({ ...user, question1: e.target.value })
              }
            />
          </>
        )}

        <label>Answer 1</label>
        <input
          type="text"
          value={user.answer1}
          onChange={e => setUser({ ...user, answer1: e.target.value })}
        />

        <label>Security Question 2</label>
        <select
          value={q2Type}
          onChange={e => {
            const val = e.target.value;
            setQ2Type(val);
            setUser({
              ...user,
              question2: val === "other" ? "" : val
            });
          }}
        >
          <option value="">-- Select a question --</option>
          <option value="nickname">What is your Nickname?</option>
          <option value="school">What is your First School Name?</option>
          <option value="birthplace">What is your Place of Birth?</option>
          <option value="age">What is your Age?</option>
          <option value="other">Other</option>
        </select>

        {q2Type === "other" && (
          <>
            <label>Custom Question 2</label>
            <input
              type="text"
              value={user.question2}
              onChange={e =>
                setUser({ ...user, question2: e.target.value })
              }
            />
          </>
        )}

        <label>Answer 2</label>
        <input
          type="text"
          value={user.answer2}
          onChange={e => setUser({ ...user, answer2: e.target.value })}
        />
      </div>

      <div className="actions">
        <button onClick={register}>SAVE</button>
      </div>
    </div>
  );
}
