// ScoreboardGrid.js

import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardGrid.css';
import TopBar from './TopBar';

const ScoreboardGrid = () => {
    const [scoreboardDataList, setScoreboardDataList] = useState([]);
    const [expandedScoreboards, setExpandedScoreboards] = useState([]);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/scores');
                const data = await response.json();
                setScoreboardDataList(data);
                setExpandedScoreboards(Array(data.length).fill(false)); // Initialize all scoreboards as not expanded
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

    const handleScoreboardClick = (index) => {
        const newExpandedScoreboards = [...expandedScoreboards];
        newExpandedScoreboards[index] = !newExpandedScoreboards[index];
        setExpandedScoreboards(newExpandedScoreboards);
    };

    const handleFilterChange = (category) => {
        setFilter(category);
    };

    const handleFilterReset = () => {
        setFilter(null);
    };

    const filteredScoreboards = scoreboardDataList.filter((scoreboard) => {
        // Filter by category if a filter is set
        if (filter) {
            if (Array.isArray(filter)) {
                // If the filter is an array (e.g., "All Football"), check if the scoreboard type matches any of the types
                if (!filter.includes(scoreboard.type)) return false;
            } else {
                // If the filter is a single category
                if (scoreboard.type !== filter) return false;
            }
        }

        // Get the game date and omit if before today, final scores included only for the day games occurred
        const gameDate = new Date(scoreboard.date);
        const today = new Date();
        gameDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return gameDate >= today;
    });

    return (
        <div>
            <TopBar
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
            />
            <div className="scoreboard-grid">
                {filteredScoreboards.map((scoreboardData, index) => {
                    var isLive = scoreboardData.home_score !== undefined;
                    const isFinal = scoreboardData.time === "Final";
                    if (isFinal) {
                        isLive = false;
                    }
                    return (
                        <div key={index} onClick={() => handleScoreboardClick(index)}>
                            <Scoreboard
                                key={index}
                                data={scoreboardData}
                                isLive={isLive}
                                isFinal={isFinal}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScoreboardGrid;
