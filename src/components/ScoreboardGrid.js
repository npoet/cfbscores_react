// ScoreboardGrid.js

import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardGrid.css';

const ScoreboardGrid = () => {
    const [scoreboardDataList, setScoreboardDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/scores/');
                const data = await response.json();
                setScoreboardDataList(data);
            } catch (error) {
                console.error('Error fetching scoreboard data:', error);
            }
        };

        fetchData();

        // Set up automatic refresh for live games every 30 seconds
        const liveGames = scoreboardDataList.filter(item => item.home_score !== undefined);
        if (liveGames.length > 0) {
            const refreshInterval = setInterval(() => {
                fetchData();
            }, 30000); // Refresh every 30 seconds

            return () => {
                clearInterval(refreshInterval); // Clear the interval on component unmount
            };
        }
    }, [scoreboardDataList]); // Trigger the effect whenever scoreboardDataList changes

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
