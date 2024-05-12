import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import QuizResult from './QuizResults';

const FetchedQuizes = ({ quizes }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(quizes.length).fill(''));
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(15);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                handleNext(); // Move to next question when timer reaches 0
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleNext = () => {
        if (currentQuestion < quizes.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimer(15); // Reset timer for next question
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setTimer(15); // Reset timer for previous question
        }
    };

    const handleOptionSelect = (option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = option;
        setUserAnswers(updatedAnswers);
        handleNext(); // Automatically go to the next question
    };

    const handleSubmit = () => {
        let totalScore = 0;
        for (let i = 0; i < quizes.length; i++) {
            if (userAnswers[i] === quizes[i].correct_answer) {
                totalScore++;
            }
        }
        setScore(totalScore);
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(quizes.length).fill(''));
        setScore(null);
    };

    if (score !== null) {
        return <QuizResult score={score} onRestart={handleRestart} />;
    }

    return (
        <div>
            <QuizCard
                question={quizes[currentQuestion].question}
                options={quizes[currentQuestion].incorrect_answers}
                onNext={handleNext}
                onPrev={handlePrev}
                selectedOption={userAnswers[currentQuestion]}
                onOptionSelect={handleOptionSelect}
            />
            {currentQuestion === quizes.length - 1 && (
                <>
                    <p>Time remaining: {timer} seconds</p>
                    <button onClick={handleSubmit}>Submit</button>
                </>
            )}
        </div>
    );
};

export default FetchedQuizes;
