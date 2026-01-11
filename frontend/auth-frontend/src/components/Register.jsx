import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    dob: "",
    password: "",
    question1: "",
    answer1: "",
    question2: "",
    answer2: ""
  });

  const register = async () => {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    alert(await res.text());
  };

  return (
    <div>
      <h2>User Registration</h2>

      <label>User ID:</label><br />
      <input
        type="text"
        onChange={e => setUser({ ...user, userId: e.target.value })}
      /><br /><br />

      <label>Username:</label><br />
      <input
        type="text"
        onChange={e => setUser({ ...user, username: e.target.value })}
      /><br /><br />

      <label>DOB:</label><br />
      <input
        type="date"
        onChange={e => setUser({ ...user, dob: e.target.value })}
      /><br /><br />

      <label>Password:</label><br />
      <input
        type="password"
        onChange={e => setUser({ ...user, password: e.target.value })}
      /><br />
      <small>
        Password must be 8–12 chars, alphanumeric, 1 special char, 1 capital letter
      </small>
      <br /><br />

      <label>Question 1:</label><br />
      <input
        type="text"
        placeholder="What is your nickname?"
        onChange={e => setUser({ ...user, question1: e.target.value })}
      /><br /><br />

      <label>Answer 1:</label><br />
      <input
        type="text"
        onChange={e => setUser({ ...user, answer1: e.target.value })}
      /><br /><br />

      <label>Question 2:</label><br />
      <input
        type="text"
        placeholder="What is your place of birth?"
        onChange={e => setUser({ ...user, question2: e.target.value })}
      /><br /><br />

      <label>Answer 2:</label><br />
      <input
        type="text"
        onChange={e => setUser({ ...user, answer2: e.target.value })}
      /><br /><br />

      <button onClick={register}>SAVE</button>
    </div>
  );
}
