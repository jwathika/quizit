import React, { useState } from 'react';

const GroupPlay = ({ numPlayers }) => {
    const [playerNames, setPlayerNames] = useState([]);
    const [playerScores, setPlayerScores] = useState(Array(numPlayers).fill(0));

    const handleNameChange = (event, index) => {
        const newName = event.target.value;
        setPlayerNames((prevNames) => {
            const newNames = [...prevNames];
            newNames[index] = newName;
            return newNames;
        });
    };

    const handleScoreChange = (event, index) => {
        const newScore = parseInt(event.target.value) || 0;
        setPlayerScores((prevScores) => {
            const newScores = [...prevScores];
            newScores[index] = newScore;
            return newScores;
        });
    };

    const renderPlayers = () => {
        return playerNames.map((name, index) => (
            <div key={index}>
                <input type="text" value={name} onChange={(event) => handleNameChange(event, index)} placeholder={`Player ${index + 1}`} />
                <input type="number" value={playerScores[index]} onChange={(event) => handleScoreChange(event, index)} placeholder="Score" />
            </div>
        ));
    };

    const calculateTotalScore = () => {
        return playerScores.reduce((total, score) => total + score, 0);
    };

    const renderLeaderboard = () => {
        const sortedPlayers = playerNames.map((name, index) => ({ name, score: playerScores[index] }))
            .sort((a, b) => b.score - a.score);

        return (
            <div>
                <h3>Leaderboard</h3>
                <ol>
                    {sortedPlayers.map((player, index) => (
                        <li key={index}>{player.name}: {player.score}</li>
                    ))}
                </ol>
                <p>Total Score: {calculateTotalScore()}</p>
            </div>
        );
    };

    return (
        <div>
            <h2>Group Play</h2>
            <h3>Players</h3>
            {renderPlayers()}
            {renderLeaderboard()}
        </div>
    );
};

export default GroupPlay;
