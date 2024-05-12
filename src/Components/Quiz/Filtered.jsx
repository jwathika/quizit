import React, { useState } from 'react';
import axios from 'axios';
import './custom.css';
const Filtered = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(5);
    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [timeLimit, setTimeLimit] = useState('');
    const [isGroupPlay, setIsGroupPlay] = useState(false);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.value);
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    const handleTimeLimitChange = (event) => {
        setTimeLimit(event.target.value);
    };

    const handleGroupPlayChange = (event) => {
        setIsGroupPlay(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchQuestions();
    };

    const fetchQuestions = () => {
        if (!selectedCategory) return;

        axios.get(`https://opentdb.com/api.php?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}`)
            .then((response) => {
                console.log(response.data.results);
                // Handle the fetched questions data
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    };

    return (
        <div className="form-container">
            <h2>Quiz Settings</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Category:
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        {categories.map((catObj) => (
                            <option key={catObj.id} value={catObj.id}>{catObj.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Amount:
                    <input type="number" min="1" max="50" value={selectedAmount} onChange={handleAmountChange} />
                </label>
                <label>
                    Difficulty:
                    <select value={selectedDifficulty} onChange={handleDifficultyChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label>
                    Time Limit (optional):
                    <input type="text" value={timeLimit} onChange={handleTimeLimitChange} />
                </label>
                <label>
                    Group Play:
                    <input type="checkbox" checked={isGroupPlay} onChange={handleGroupPlayChange} />
                </label>
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
};

export default Filtered;
