import React, { useEffect } from 'react';
import he from 'he';

const QuizCard = ({ question, options, onNext, onPrev, selectedOption, onOptionSelect }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                onNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onNext]);

    const handleNextButtonClick = () => {
        if (selectedOption !== '') {
            onNext();
        }
    };

    return (
        <div>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4">{he.decode(question)}</h2>
            <div className="options">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="quiz-option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => onOptionSelect(option)}
                        />
                        <label htmlFor={`option-${index}`} className="ml-2">{he.decode(option)}</label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 md:mt-4">
            <button onClick={onPrev} className="bg-blue-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-md">Previous</button>
            <button
                onClick={handleNextButtonClick}
                disabled={!selectedOption}
                className={`bg-blue-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-md ${(!selectedOption) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Next
            </button>
        </div>
        </div>
    );
};

export default QuizCard;
