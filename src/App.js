import React, { useState } from 'react';
import data from './questions.json';
import './App.css';

function App() {

  const colors = ['red', 'blue', 'green', 'pink'];
  const parsedData = JSON.parse(JSON.stringify(data));
  const questions = parsedData.questions.map(question => ({
    ...question,
    answers: question.answers.sort(() => Math.random() -0.5),
  }));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='app'>
      <h1>Baby Quiz</h1>
      {showScore ? (
        <div className='score-section'>You scored {score} out of {questions.length}</div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
  {questions[currentQuestion].answers.map((answer, index) => (
    <button 
      onClick={() => handleAnswerOptionClick(answer.isCorrect)} 
      key={index} 
      style={{ backgroundColor: colors[index % colors.length] }}
    >
      {answer.text}
    </button>
  ))}
</div>
        </>
      )}
    </div>
  );
}

export default App;