// ScoreboardGrid.js

import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardGrid.css';
import TopBar from './TopBar'

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

    const handleExpandAll = () => {
        setExpandedScoreboards(Array(scoreboardDataList.length));
    };

    const handleFilterChange = (category) => {
        setFilter(category);
    };

    const handleFilterReset = () => {
        setFilter(null);
    };

    const filteredScoreboards = filter
        ? scoreboardDataList.filter((scoreboard) => scoreboard.type === filter)
        : scoreboardDataList;

    return (
        <div>
            <TopBar
                onExpandAll={handleExpandAll}
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
            />
            <div className="scoreboard-grid">
                {filteredScoreboards.map((scoreboardData, index) => {
                    var isLive = scoreboardData.home_score !== undefined;
                    const isFinal = scoreboardData.time == "Final";
                    if (isFinal) {
                        isLive = false
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
