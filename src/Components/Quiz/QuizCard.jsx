import React, { useState } from 'react';

const QuizCard = ({ question, options, onNext, onPrev }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onNext();
    };

    return (
        <div className="quiz-card dark:bg-gray-800 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">{question}</h2>
            <div className="options">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="quiz-option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleOptionSelect(option)}
                        />
                        <label htmlFor={`option-${index}`} className="ml-2">{option}</label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={onPrev} className="bg-blue-500 text-white px-4 py-2 rounded-md">Previous</button>
                <button
                    onClick={() => handleOptionSelect('')}
                    disabled={!selectedOption}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuizCard;
