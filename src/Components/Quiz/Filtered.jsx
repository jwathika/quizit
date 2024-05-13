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
    const [timeLimitMinutes, setTimeLimitMinutes] = useState("00");
    // const [isGroupPlay, setIsGroupPlay] = useState(false);
    // const [numPlayers, setNumPlayers] = useState(5);
    // const [playerNames, setPlayerNames] = useState([]);
    // const [playerIcons, setPlayerIcons] = useState([]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.value);
    };

    // const handleDifficultyChange = (event) => {
    //     setSelectedDifficulty(event.target.value);
    // };

    const handleTimeLimitHoursChange = (event) => {
        setTimeLimitHours(event.target.value);
    };

    const handleTimeLimitMinutesChange = (event) => {
        setTimeLimitMinutes(event.target.value);
    };

    // const handleGroupPlayChange = (event) => {
    //     setIsGroupPlay(event.target.checked);
    // };

    // const handleNumPlayersChange = (event) => {
    //     setNumPlayers(event.target.value);
    // };

    // const generateRandomNames = (numPlayers) => {
    //     const names = [];
    //     for (let i = 0; i < numPlayers; i++) {
    //         names.push(`Player ${i + 1}`);
    //     }
    //     return names;
    // };

    // const generateRandomIcons = (numPlayers) => {
    //     const icons = [];
    //     const availableIcons = [
    //         '👤',
    //         '👨',
    //         '👩',
    //         '👮',
    //         '🕵️',
    //         '👷',
    //         '💂',
    //         '🧑‍🌾',
    //         '👩‍🍳',
    //         '👨‍🎓',
    //         '👩‍🎓',
    //         '👨‍🏫',
    //         '👩‍🏫',
    //         '👨‍⚖️',
    //         '👩‍⚖️',
    //         '👨‍🌾',
    //         '👩‍🌾',
    //         '👨‍🍳',
    //         '👩‍🍳',
    //         '👨‍🔧',
    //         '👩‍🔧',
    //         '👨‍🏭',
    //         '👩‍🏭',
    //         '👨‍💼',
    //         '👩‍💼',
    //         '👨‍🔬',
    //         '👩‍🔬',
    //         '👨‍💻',
    //         '👩‍💻',
    //         '👨‍🎤',
    //         '👩‍🎤',
    //         '👨‍🎨',
    //         '👩‍🎨',
    //         '👨‍✈️',
    //         '👩‍✈️',
    //         '👨‍🚀',
    //         '👩‍🚀',
    //         '👨‍🚒',
    //         '👩‍🚒',
    //         '🧑‍🤝‍🧑',
    //         '👭',
    //         '👬',
    //         '🧑‍🤝‍🧑',
    //     ];
    //     for (let i = 0; i < numPlayers; i++) {
    //         const randomIndex = Math.floor(Math.random() * availableIcons.length);
    //         icons.push(availableIcons[randomIndex]);
    //         availableIcons.splice(randomIndex, 1);
    //     }
    //     return icons;
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchQuestions();
    };

    const fetchQuestions = () => {
        if (!selectedCategory) return;

        const totalMinutes =
            (parseInt(timeLimitHours, 10) || 0) * 60 + (parseInt(timeLimitMinutes, 10) || 0);
        axios
            .get(
                `https://opentdb.com/api.php?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}`
            )
            .then((response) => {
                console.log(response.data.results);
                const newQuestions = response.data.results;

                const existingQuizzes = JSON.parse(localStorage.getItem('quizes')) || [];

                const filteredQuestions = newQuestions.filter(newQuestion => {
                    const exists = existingQuizzes.some(existingQuestion => {
                        return existingQuestion.question === newQuestion.question;
                    });
                    return !exists;
                });

                const updatedQuizzes = [...existingQuizzes, ...filteredQuestions];

                setQuizes(updatedQuizzes);

                localStorage.setItem('quizes', JSON.stringify(updatedQuizzes));
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    };


    return (
        <>
            {quizes && quizes.length > 0 ? (
                <FetchedQuizes quizes={quizes} timeLimitHours={timeLimitHours} timeLimitMinutes={timeLimitMinutes} />
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className="text-start font-bold text-xl mb-5">Quiz Settings</h2>
                    <div className="mb-5">
                        <label htmlFor="category" className="block font-bold text-lg text-gray-900 mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            id="category"
                            name="category"
                            className="border py-2 px-3 text-gray-800 w-full bg-white"
                        >
                            <option>Choose...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="my-5">
                        <label htmlFor="number_of_questions" className="block font-bold text-lg text-gray-900 mb-2">
                            Number of Questions
                        </label>
                        <input
                            value={selectedAmount}
                            onChange={handleAmountChange}
                            type="number"
                            id="number_of_questions"
                            name="number_of_questions"
                            min="1"
                            max="50"
                            className="border py-2 px-3 text-gray-800 w-full bg-white"
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor="time_limit_hours" className="block font-bold text-lg text-gray-900 mb-2">
                            Time Limit
                        </label>
                        <div className="flex gap-5">
                            <label className="flex items-center">
                                <input
                                    value={timeLimitHours}
                                    onChange={handleTimeLimitHoursChange}
                                    type="number"
                                    name="time_limit_hours"
                                    min="0"
                                    max="12"
                                    className="border py-2 px-3 text-gray-800 w-full bg-white"
                                />
                                hours
                            </label>
                            <label className="flex items-center">
                                <input
                                    value={timeLimitMinutes}
                                    onChange={handleTimeLimitMinutesChange}
                                    type="number"
                                    name="time_limit_minutes"
                                    min="1"
                                    max="59"
                                    className="border py-2 px-3 text-gray-800 w-full bg-white"
                                />
                                minutes
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800 text-white uppercase text-sm py-3 px-5 rounded"
                    >
                        Start Quiz
                    </button>
                </form>

            )}
        </>
    );
};

export default Filtered;
