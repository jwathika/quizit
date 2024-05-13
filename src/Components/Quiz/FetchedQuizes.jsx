import React, { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import QuizResult from './QuizResults';

const shuffleOptions = (correct, incorrect) => {
    const options = [correct, ...incorrect];
    return options.sort(() => Math.random() - 0.5);
};

const FetchedQuizes = ({ quizes }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(quizes.length).fill(''));
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(15);
    const [shuffledQuizes, setShuffledQuizes] = useState([]);

    useEffect(() => {
        if (quizes) {
            setShuffledQuizes(quizes.map(quiz => ({
                ...quiz,
                options: shuffleOptions(quiz.correct_answer, quiz.incorrect_answers)
            })));
        }
    }, [quizes]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                handleNext();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleNext = () => {
        if (timer === 0 || userAnswers[currentQuestion] !== '') {
            if (currentQuestion < quizes.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setTimer(15);
            }
        }
    };


    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setTimer(15);
        }
    };

    const handleOptionSelect = (option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = option;
        setUserAnswers(updatedAnswers);
        handleNext();
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
        setTimer(15);
    };

    if (score !== null) {
        return <QuizResult score={score} onRestart={handleRestart} />;
    }

    if (shuffledQuizes.length === 0 || shuffledQuizes[currentQuestion] === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <QuizCard
                question={shuffledQuizes[currentQuestion]?.question}
                options={shuffledQuizes[currentQuestion]?.options}
                onNext={handleNext}
                onPrev={handlePrev}
                selectedOption={userAnswers[currentQuestion]}
                onOptionSelect={handleOptionSelect}
            />
            {currentQuestion === quizes.length - 1 && (
                <div className=' flex items-center justify-between font-bold mt-5'>
                    <button className='bg-stone-100 py-3 px-4' onClick={handleSubmit}>Submit</button>
                    <p>Time remaining: {timer} seconds</p>
                </div>
            )}
        </>
    );
};

export default FetchedQuizes;
