import React, { useState } from 'react';
import axios from 'axios';
import './custom.css';
import FetchedQuizes from './FetchedQuizes';
const Filtered = ({ categories }) => {
    const [quizes, setQuizes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(5);
    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [timeLimitHours, setTimeLimitHours] = useState('0');
    const [timeLimitMinutes, setTimeLimitMinutes] = useState('');
    const [isGroupPlay, setIsGroupPlay] = useState(false);
    const [numPlayers, setNumPlayers] = useState(5);
    const [playerNames, setPlayerNames] = useState([]);
    const [playerIcons, setPlayerIcons] = useState([]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.value);
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    const handleTimeLimitHoursChange = (event) => {
        setTimeLimitHours(event.target.value);
    };

    const handleTimeLimitMinutesChange = (event) => {
        setTimeLimitMinutes(event.target.value);
    };

    const handleGroupPlayChange = (event) => {
        setIsGroupPlay(event.target.checked);
    };

    const handleNumPlayersChange = (event) => {
        setNumPlayers(event.target.value);
    };

    const generateRandomNames = (numPlayers) => {
        const names = [];
        for (let i = 0; i < numPlayers; i++) {
            names.push(`Player ${i + 1}`);
        }
        return names;
    };

    const generateRandomIcons = (numPlayers) => {
        const icons = [];
        const availableIcons = ['👤', '👨', '👩', '👮', '🕵️', '👷', '💂', '🧑‍🌾', '👩‍🍳', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍⚖️', '👩‍⚖️', '👨‍🌾', '👩‍🌾', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻', '👨‍🎤', '👩‍🎤', '👨‍🎨', '👩‍🎨', '👨‍✈️', '👩‍✈️', '👨‍🚀', '👩‍🚀', '👨‍🚒', '👩‍🚒', '🧑‍🤝‍🧑', '👭', '👬', '🧑‍🤝‍🧑'];
        for (let i = 0; i < numPlayers; i++) {
            const randomIndex = Math.floor(Math.random() * availableIcons.length);
            icons.push(availableIcons[randomIndex]);
            availableIcons.splice(randomIndex, 1);
        }
        return icons;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchQuestions();
    };

    const fetchQuestions = () => {
        if (!selectedCategory) return;

        const totalMinutes = (parseInt(timeLimitHours, 10) || 0) * 60 + (parseInt(timeLimitMinutes, 10) || 0);

        axios.get(`https://opentdb.com/api.php?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}`)
            .then((response) => {
                console.log(response.data.results);
                setQuizes(response.data.results);
                localStorage.setItem('quizes', JSON.stringify(setQuizes));
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    };

    return (
        <>
            {quizes && quizes.length > 0 ? (
                <FetchedQuizes quizes={quizes} />
            ) : (
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
                            Time Limit:
                            <input type="number" min="0" placeholder="Hours" value={timeLimitHours} onChange={handleTimeLimitHoursChange} /> hours
                            <input type="number" min="0" max="59" placeholder="Minutes" value={timeLimitMinutes} onChange={handleTimeLimitMinutesChange} /> minutes
                        </label>
                        <label>
                            Group Play:
                            <input type="checkbox" checked={isGroupPlay} onChange={handleGroupPlayChange} />
                        </label>
                        {isGroupPlay && (
                            <label>
                                Number of Players:
                                <input type="number" min="1" value={numPlayers} onChange={handleNumPlayersChange} />
                            </label>
                        )}
                        {isGroupPlay && (
                            <>
                                <h3>Player Names and Icons:</h3>
                                {playerNames.map((name, index) => (
                                    <div key={index}>
                                        {playerIcons[index]} {name}
                                    </div>
                                ))}
                            </>
                        )}
                        <button type="submit">Start Quiz</button>
                    </form>

                </div >
            )}

        </>
    );
};

export default Filtered;
