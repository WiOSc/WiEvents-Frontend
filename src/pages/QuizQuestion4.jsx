import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { API_BASE_URL } from "../config";

const QuizQuestion4 = () => {
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
    if (answer.trim().toLowerCase() === "ottawa") {
      navigate(`/quiz-question-5`); 
    } else {
      setError("Incorrect answer! Try again.");
      setShake(true); 
      setTimeout(() => setShake(false), 500); 
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={`${styles.quizContent} ${shake ? styles.shake : ""}`}>
        <h2 className={styles.quizTitle}>Question 4</h2>
        <p className={styles.questionText}>What is the capital of Canada?</p>

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
        {showHint && <p className={styles.hintText}>It's known for its picturesque canals and historic architecture.</p>}

        {error && <p className={styles.errorText}>{error}</p>}

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion4;