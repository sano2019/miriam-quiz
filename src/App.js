import React, { useState } from 'react';
import data from './questions.json';
import './App.css';

function App() {

  const colors = ['red', 'blue', 'green', 'purple'];
  const parsedData = JSON.parse(JSON.stringify(data));
  const questions = parsedData.questions.map(question => ({
    ...question,
    answers: question.answers.sort(() => Math.random() -0.5),
  }));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

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
      <h1>{parsedData.title}</h1>
      { !started ? (<div className='container'>
        <img src={require('./images/1.png')} alt='quiz' />  
        <button onClick={()=> setStarted(true)}>Start Quiz</button>
      <h3>{parsedData.description}</h3>
</div>) :(
      <div>{showScore ? (
        <div className='score-section'>
        <div>You scored {score} out of {questions.length}</div>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <img src={require(`./images/${currentQuestion + 2}.png`)} alt='quiz' className='question-image' />
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
      )}</div>)}
    </div>
  );
}

export default App;