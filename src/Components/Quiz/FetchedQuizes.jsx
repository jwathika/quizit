import React from 'react';
import QuizCard from './QuizCard';
const FetchedQuizes = ({ quizes }) => {
    if (!quizes || !Array.isArray(quizes)) {
        return <div>No quizzes to display</div>;
    }

    return (
        <div>
            {quizes.map((quizObj, index) => (
                <QuizCard key={index} question={quizObj.question} options={quizObj.options} />
            ))}
        </div>
    );
};

export default FetchedQuizes;
