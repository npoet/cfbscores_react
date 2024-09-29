import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardGrid.css';
import TopBar from './TopBar';

// Add non-expandable game types here
const nonExpandableTypes = ['EPL'];

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

    const handleScoreboardClick = (index, gameType) => {
        // Prevent expansion if the game type is in the nonExpandableTypes array
        if (nonExpandableTypes.includes(gameType)) {
            return; // Do nothing if it's a non-expandable game type
        }

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

        const gameDate = new Date(scoreboard.date);
        const today = new Date();
        const fiveDaysAgo = new Date();
        const sevenDaysFromNow = new Date();

        // Set the hours to 0 for date-only comparison
        gameDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        fiveDaysAgo.setHours(0, 0, 0, 0);
        sevenDaysFromNow.setHours(0, 0, 0, 0);

        // Adjust `fiveDaysAgo` to be 5 days before today
        fiveDaysAgo.setDate(today.getDate() - 5);

        // Adjust `sevenDaysFromNow` to be 7 days ahead of today
        sevenDaysFromNow.setDate(today.getDate() + 7);

        // Return true if the game date is within the last 5 days or up to a week in the future
        return gameDate >= fiveDaysAgo && gameDate <= sevenDaysFromNow;
    });

    return (
        <div>
            <TopBar
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
            />
            <div className="scoreboard-grid">
                {filteredScoreboards.map((scoreboardData, index) => {
                    const gameType = scoreboardData.type; // Capture the game type
                    const isLive = scoreboardData.home_score !== undefined && !(scoreboardData.time && (scoreboardData.time.includes("Final") || scoreboardData.time.includes("FT")));
                    const isFinal = scoreboardData.time && (scoreboardData.time.includes("Final") || scoreboardData.time.includes("FT"));

                    return (
                        <div key={index} onClick={() => handleScoreboardClick(index, gameType)}>
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
