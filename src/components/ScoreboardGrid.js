// ScoreboardGrid.js

import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardGrid.css';

const ScoreboardGrid = () => {
    const [scoreboardDataList, setScoreboardDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/scores');
                const data = await response.json();
                setScoreboardDataList(data);
            } catch (error) {
                console.error('Error fetching scoreboard data:', error);
            }
        };

        fetchData();

        // Set up automatic refresh every 1 minute
        const refreshInterval = setInterval(fetchData, 60000); // 1 minute (60000 milliseconds)

        // Clear the interval when the component is unmounted or if there's a navigation
        return () => clearInterval(refreshInterval);
    }, []);

    return (
        <div className="scoreboard-grid">
            {scoreboardDataList.map((scoreboardData, index) => {
                const isLive = scoreboardData.home_score !== undefined;
                return (
                    <Scoreboard
                        key={index}
                        data={scoreboardData}
                        isLive={isLive}
                    />
                );
            })}
        </div>
    );
};

export default ScoreboardGrid;
