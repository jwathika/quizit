import React from 'react';

const QuizResult = ({ score, onRestart }) => {
    return (

        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quiz Completed!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Your final score is
                <span className="block text-indigo-600 text-4xl font-bold animate-pulse">
                    {score}
                </span>
            </p>
            <button
                onClick={onRestart}
                className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default QuizResult;
