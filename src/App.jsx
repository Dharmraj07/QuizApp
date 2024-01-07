import React from 'react'
import Quiz from './Quiz'
import './App.css'
import { QuizProvider } from './QuizContext'

const App = () => {
  return (
    <QuizProvider>
    <div className="App">
      <h1>Quiz App</h1>
      <Quiz />
    </div>
  </QuizProvider>
  )
}

export default App
