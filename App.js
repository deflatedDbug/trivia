import React, { useState } from "react";
import "./App.css";

const API_URL = "https://opentdb.com/api.php?amount=10";
const App = () => {
  const [question, setQuestion] = useState([]);
  const questions = async (questions) => {
    const response = await fetch(`${API_URL} &s=${question}`);
    const data = await response.json();
    setQuestion(data.question);
  };

  // const [currentQuestion, setCurrentQuestion] = useState(0);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = question + 1;
    if (nextQuestion < questions.length) {
      setQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {question + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[question].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[question].answerOptions.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
