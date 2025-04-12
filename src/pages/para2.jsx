import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { API_BASE_URL } from "../config";

const Para2 = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const passageContent = `Examining the grand study, Julian noticed an old painting of Lord Blackwood hanging above the fireplace. "The silent watchman," he murmured. At exactly midnight, he pressed the frame, and with a click, a hidden compartment slid open. Inside was an aged leather journal, its pages yellowed with time. 
  
As he flipped through it, the ink appeared to shift under the dim candlelight. At the back, a cipher was scribbled hastily in the margins, accompanied by a peculiar symbol resembling an hourglass.`;

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

  const handleNext = () => {
    navigate("/question2");
  };

  return (
    <div className={styles.quizContainer}>
      <div 
        className={styles.quizContent}
        style={{  
          maxWidth: "800px",
          // width: "100%",
          marginTop: "10vh",
          padding: "2rem",
          paddingTop: "0rem"
        }}
      >
        {/* <h2 className={styles.quizTitle} style={{ 
        marginBottom: "0rem", // Reduced from default
        fontSize: "1.8rem", // Slightly larger
        textAlign: "center" // Center aligned
        }}>
  The Cipher of Blackwood Manor
</h2> */}
        
        <div 
          className={styles.passageContainer}
          style={{  // Internal CSS for passage container
            marginTop:"0 rem",
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
          >
          </span>
        </div>

        <button 
          onClick={handleNext} 
          className={styles.submitButton}  // Using existing submit button style
          style={{  // Additional internal CSS if needed
            marginTop: "0rem",
            fontSize: "1.1rem"
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Para2;