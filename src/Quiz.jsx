// Import the custom hook for accessing the QuizContext
import React from 'react';
import { useQuizContext } from "./QuizContext";

// Define the Quiz component
const Quiz = () => {
    // Destructure values and functions from the context using the custom hook
    const {
        questions,
        index,
        score,
        answerQuestion,
        resetQuiz,
        nextQuestion
    } = useQuizContext();

    // Get the current question based on the index
    const currentQuestion = questions[index];

    // If there are no more questions, display quiz completion message
    if (!currentQuestion) {
        return (
            <div>
                <p>Quiz completed!</p>
                <p>Your score: {score}</p>
                <button onClick={resetQuiz}>Restart Quiz</button>
            </div>
        )
    }

    // Render the current question and answer options
    return (
        <div>
            <h2>{currentQuestion.question}</h2>
            {/* Display answer options in a horizontal list */}
            <ol style={{ display: "flex" }}>
                {
                    currentQuestion.options.map((option, index) => (
                        <li style={{ margin: "0 30px" }} key={index}>
                            {/* Button for each answer option with an onClick event to handle user's answer */}
                            <button onClick={() => answerQuestion(option.isCorrect)}> {option.text}</button>
                        </li>
                    ))
                }
            </ol>
            <h3>Score: {score}</h3>
            {/* Button to move to the next question */}
            <button onClick={nextQuestion}>Next Questions</button>
        </div>
    )
}

// Export the Quiz component as the default export
export default Quiz;
