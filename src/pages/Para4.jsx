import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { API_BASE_URL } from "../config";

const Para4 = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [error, setError] = useState("");

  const passageContent = `Returning to the study, Julian unlocked the desk drawer. Inside, he found a letter addressed to Eleanor, written by her father before his disappearance. But there was something else—a second envelope, sealed with red wax and marked only with an unfamiliar sigil. 

Eleanor clutched the letter, tears brimming in her eyes. "He wanted me to find him. But it's too late now." 

Julian placed a reassuring hand on her shoulder. "Sometimes, the truth is the only closure we need." 

As the fire crackled in the hearth, the shadows of 
Blackwood Manor seemed to lighten, the ghosts of the 
past finally put to rest. But Julian’s eyes remained on the 
second envelope. Something about it unsettled him. A 
mystery left unsolved. For now. 
`;

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= passageContent.length) {
        setDisplayText(passageContent.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleFinish = async () => {
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

      alert("All answers have been recorded! Ending event...");
      navigate(`/leaderboard`);
    } catch (err) {
      console.error("Error ending event:", err);
      setError("Error ending event. Please try again.");
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div 
        className={styles.quizContent}
        style={{  
          maxWidth: "800px",
          marginTop: "10vh",
          padding: "2rem",
          paddingTop: "0rem"
        }}
      >
        <div 
          className={styles.passageContainer}
          style={{  
            fontSize: "1.1rem",
            lineHeight: "1.6",
            textAlign: "justify",
            whiteSpace: "pre-wrap"
          }}
        >
          {displayText}
          <span 
            style={{ 
              borderRight: showCursor ? "2px solid black" : "none",
              animation: "blink 1s step-end infinite",
              marginLeft: "3px"
            }}
          ></span>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <button 
          onClick={handleFinish} 
          className={styles.submitButton}
          style={{
            marginTop: "1rem",
            fontSize: "1.1rem"
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Para4;
