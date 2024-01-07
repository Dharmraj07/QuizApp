// Import necessary dependencies from React and other libraries
import React, { createContext, useContext, useState } from "react";
import { quizQuestionsData } from "./quizQuestionsData"; // Import the data containing quiz questions
import Swal from 'sweetalert2'; // Import SweetAlert2 for displaying pop-up messages
import withReactContent from 'sweetalert2-react-content'; // Integrate SweetAlert2 with React

// Create an instance of SweetAlert2 with React integration
const MySwal = withReactContent(Swal);

// Create a context to manage the state and functions of the quiz
const QuizContext = createContext();

// Define the QuizProvider component to provide quiz state and functions to its children
const QuizProvider = ({ children }) => {
    // Define state variables using the useState hook
    const [questions, setQuestions] = useState(quizQuestionsData); // State for storing quiz questions
    const [index, setIndex] = useState(0); // State for tracking the current question index
    const [score, setScore] = useState(0); // State for keeping track of the user's score

    // Function to move to the next question
    const nextQuestion = () => {
        setIndex((prevIndex) => prevIndex + 1);
    };

    // Function to handle user's answer to a question
    const answerQuestion = (isCorrect) => {
        if (isCorrect) {
            // If the answer is correct, increment the score
            setScore((prevScore) => prevScore + 1);

            // Display a success pop-up for a correct answer
            MySwal.fire({
                title: 'Right',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: '#d4edda', // Green background color for correct answer
            });
        } else {
            // Display an error pop-up for a wrong answer
            MySwal.fire({
                title: 'Wrong',
                icon: 'error',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: '#f8d7da', // Red background color for wrong answer
            });
        }

        // Move to the next question after handling the user's answer
        nextQuestion();
    };


    // Function to reset the quiz back to the initial state
    const resetQuiz = () => {
        setIndex(0); // Reset the current question index
        setScore(0); // Reset the user's score
    };

    // Create a value object to pass down the state and functions to the context consumers
    const value = {
        questions, // Array of quiz questions
        index, // Current question index
        score, // User's score
        answerQuestion, // Function to handle user's answer
        resetQuiz, // Function to reset the quiz
        nextQuestion, // Function to move to the next question
    };

    // Provide the value object to the context and render its children
    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};

// Define a custom hook for accessing the QuizContext
const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
};

// Export the custom hook and QuizProvider component for use in other parts of the application
export { useQuizContext, QuizProvider };
