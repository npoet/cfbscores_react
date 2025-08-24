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
        const gameDate = new Date(scoreboard.date);
        const today = new Date();

        // Normalize dates to midnight
        gameDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        // If filter is TODAY → only return games from today
        if (filter === 'TODAY') {
            return gameDate.getTime() === today.getTime();
        }

        // Filter by category if a filter is set
        if (filter) {
            if (Array.isArray(filter)) {
                if (!filter.includes(scoreboard.type)) return false;
            } else {
                if (scoreboard.type !== filter) return false;
            }
        }

        const fiveDaysAgo = new Date(today);
        const sevenDaysFromNow = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);
        sevenDaysFromNow.setDate(today.getDate() + 7);

        // Default range: show games from last 5 days to next 7 days
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
                    const gameType = scoreboardData.type;
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
