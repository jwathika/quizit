
import React from 'react';

const QuizResult = ({ score, onRestart }) => {
    return (
        <div>
            <h2>Your Score: {score}</h2>
            <button onClick={onRestart}>Restart</button>
        </div>
    );
};

export default QuizResult;
