import { useState } from "react";

export default function ForgotPassword() {
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({ answer1: "", answer2: "" });
  const [result, setResult] = useState("");

  const loadQuestions = async () => {
    const res = await fetch(
      `http://localhost:8080/api/security-questions/${userId}`
    );
    const data = await res.json();
    setQuestions(data);
  };

  const submit = async () => {
    const res = await fetch("http://localhost:8080/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...answers })
    });
    const text = await res.text();
    setResult(text);
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <label>User ID:</label><br />
      <input
        type="text"
        onChange={e => setUserId(e.target.value)}
      />
      <br /><br />

      <button onClick={loadQuestions}>Load Questions</button>
      <br /><br />

      {questions && (
        <>
          <label>Question 1:</label>
          <p>{questions.question1}</p>

          <label>Answer 1:</label><br />
          <input
            type="text"
            onChange={e =>
              setAnswers({ ...answers, answer1: e.target.value })
            }
          />
          <br /><br />

          <label>Question 2:</label>
          <p>{questions.question2}</p>

          <label>Answer 2:</label><br />
          <input
            type="text"
            onChange={e =>
              setAnswers({ ...answers, answer2: e.target.value })
            }
          />
          <br /><br />

          <button onClick={submit}>SUBMIT</button>
        </>
      )}

      <br /><br />

      {result && (
        <>
          {result.startsWith("Your password is") ? (
            <>
              <label>Your password is:</label><br />
              <input type="text" value={result.replace("Your password is: ", "")} readOnly />
            </>
          ) : (
            <p>{result}</p>
          )}
        </>
      )}
    </div>
  );
}
