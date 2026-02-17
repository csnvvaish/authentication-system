import { useState } from "react";

const questionMap = {
  nickname: "What is your Nickname?",
  school: "What is your First School Name?",
  birthplace: "What is your Place of Birth?",
  mother: "What is your Mother’s Surname?"
};

export default function ForgotPassword() {
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({ answer1: "", answer2: "" });
  const [result, setResult] = useState("");

  const loadQuestions = async () => {
    if (!userId.trim()) {
      alert("Enter User ID");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/api/security-questions/${userId}`
    );

    const data = await res.json();
    console.log("SECURITY QUESTIONS RESPONSE:", data); // ✅ DEBUG (required)

    // ✅ FIX: ensure valid question object only
    if (!data || !data.question1 || !data.question2) {
      alert("Security questions not found for this user");
      setQuestions(null);
      return;
    }

    setAnswers({ answer1: "", answer2: "" });
    setResult("");
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
    setAnswers({ answer1: "", answer2: "" });
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>

      <div className="userid-row">
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            setQuestions(null);
            setResult("");
          }}
        />
      </div>

      <div className="actions">
        <button onClick={loadQuestions}>Load Questions</button>
      </div>

      {questions && (
        <>
          {/* QUESTION 1 */}
          <div style={{ fontWeight: "500", marginTop: "10px" }}>
            {questionMap[questions.question1] || questions.question1}
          </div>
          <input
            type="text"
            placeholder="Enter Answer"
            value={answers.answer1}
            onChange={e =>
              setAnswers({ ...answers, answer1: e.target.value })
            }
          />

          {/* QUESTION 2 */}
          <div style={{ fontWeight: "500", marginTop: "10px" }}>
            {questionMap[questions.question2] || questions.question2}
          </div>
          <input
            type="text"
            placeholder="Enter Answer"
            value={answers.answer2}
            onChange={e =>
              setAnswers({ ...answers, answer2: e.target.value })
            }
          />

          <div className="actions">
            <button onClick={submit}>SUBMIT</button>
          </div>
        </>
      )}

      {result && <p>{result}</p>}
    </div>
  );
}
