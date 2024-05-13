import React, { useEffect, useState } from 'react';

const AddQuestion = ({categories}) => {
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState('');

  const handleSaveQuestion = () => {
    if (!question || !selectedCategory || !correctAnswer || !incorrectAnswers) {
      alert('Please fill in all fields');
      return;
    }
  
    const newQuestion = {
      type: 'multiple',
      difficulty: 'easy', 
      category: selectedCategory,
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers.split(',').map(answer => answer.trim()),
    };
  
    const existingQuestions = JSON.parse(localStorage.getItem('quizes')) || [];
  
    const updatedQuestions = [...existingQuestions, newQuestion];
  
    localStorage.setItem('quizes', JSON.stringify(updatedQuestions));
  
    setQuestion('');
    setSelectedCategory('');
    setCorrectAnswer('');
    setIncorrectAnswers('');
  
    alert('Question saved successfully!');
  };
  

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h2 className='text-start font-bold text-xl mb-5'>Add Question</h2>
      <div className="mb-5">
        <label htmlFor="question" className="block font-bold text-lg text-gray-900 mb-2">
          Question:
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border py-2 px-3 text-gray-800 w-full"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="category" className="block font-bold text-lg text-gray-900 mb-2">
          Category:
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          id="category"
          className="border py-2 px-3 text-gray-800 w-full"
        >
          <option value="">Choose...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="correctAnswer" className="block font-bold text-lg text-gray-900 mb-2">
          Correct Answer:
        </label>
        <input
          type="text"
          id="correctAnswer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border py-2 px-3 text-gray-800 w-full"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="incorrectAnswers" className="block font-bold text-lg text-gray-900 mb-2">
          Incorrect Answers (comma-separated):
        </label>
        <input
          type="text"
          id="incorrectAnswers"
          value={incorrectAnswers}
          onChange={(e) => setIncorrectAnswers(e.target.value)}
          className="border py-2 px-3 text-gray-800 w-full"
          placeholder='Ex. Mt.Everest, Mt. Kilimanjaro, Mt. Prince ....'
        />
      </div>
      <button onClick={handleSaveQuestion} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Question
      </button>
    </div>
  );
};

export default AddQuestion;
