import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { API_BASE_URL } from "../config";

const QuizQuestion5 = () => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false); 
  const navigate = useNavigate();

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleSubmit = async () => {
    if (answer.trim().toLowerCase() === "amaravathi") {
      alert("All answers have been recorded! Ending event...");
      const participantId = localStorage.getItem("participantId"); 
      if (!participantId) {
        setError("No participant ID found. Please restart the quiz.");
        return;
      }

      const endTime = new Date().toISOString();

      try {
        const response = await fetch(`${API_BASE_URL}/participant/${participantId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endTime }),
        });

        if (!response.ok) {
          throw new Error("Failed to update endTime");
        }

        navigate(`/leaderboard`);
      } catch (error) {
        console.error("Failed to log event end time:", error);
        setError("Error ending event. Please try again.");
      }
    } else {
      setError("Incorrect answer! Try again.");
      setShake(true); 
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={`${styles.quizContent} ${shake ? styles.shake : ""}`}>
        <h2 className={styles.quizTitle}>Question 5</h2>
        <p className={styles.questionText}>What is the capital of Andhra Pradesh?</p>

        <input
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          className={styles.formInput}
          placeholder="Your answer"
        />

        <button onClick={toggleHint} className={styles.hintButton}>
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>

        {showHint && <p className={styles.hintText}>It's also called the Capital</p>}

        {error && <p className={styles.errorText}>{error}</p>}

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion5;