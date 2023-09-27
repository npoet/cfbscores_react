// ScoreboardGrid.js

import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardGrid.css';

const ScoreboardGrid = () => {
    const [scoreboardDataList, setScoreboardDataList] = useState([]);

    useEffect(() => {
        const fetchScoreboardData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/scores/');
                const data = await response.json();
                setScoreboardDataList(data);
            } catch (error) {
                console.error('Error fetching scoreboard data:', error);
            }
        };

        fetchScoreboardData();
    }, []);

    return (
        <div className="scoreboard-grid">
            {scoreboardDataList.map((scoreboardData, index) => (
                <Scoreboard key={index} data={scoreboardData} />
            ))}
        </div>
    );
};

export default ScoreboardGrid;
