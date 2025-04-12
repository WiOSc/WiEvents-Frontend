import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { API_BASE_URL } from "../config";

const Question1 = () => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false); 
  const navigate = useNavigate();

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
    setError(""); 
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleSubmit = () => {
    const userAnswer = answer.trim().toLowerCase();
    if (userAnswer === process.env.REACT_APP_ANSWER1?.toLowerCase()) {
    navigate(`/para-2`);
    } else {
      setError("Incorrect answer! Try again.");
      setShake(true); 
      setTimeout(() => setShake(false), 500); 
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={`${styles.quizContent} ${shake ? styles.shake : ""}`}>
        <h2 className={styles.quizTitle}>Question 2</h2>
        <p className={styles.questionText}>
          {process.env.REACT_APP_QUESTION1 || "Default question text here"}
        </p>

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
        {showHint && <p className={styles.hintText}>It's known for its bustling streets and neon lights.</p>}

        {error && <p className={styles.errorText}>{error}</p>}

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Question1;