import React, { useState, useEffect } from 'react';

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('quizes')) || [];
    setQuestions(storedQuestions);
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 max-h-96 overflow-scroll" >
      <h2 className="text-2xl font-bold mb-4">View Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions available</p>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={index} className="bg-white shadow-md mb-4 p-4 rounded">
              <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
              <p className="text-gray-700 mb-2">Category: {question.category}</p>
              <div className="flex flex-col">
                <p className="text-green-500 font-semibold mb-1">Correct Answer:</p>
                <p className="text-gray-800">{question.correct_answer}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-red-500 font-semibold mb-1">Incorrect Answers:</p>
                {question.incorrect_answers.map((answer, index) => (
                  <p key={index} className="text-gray-800">{answer}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewQuestions;
