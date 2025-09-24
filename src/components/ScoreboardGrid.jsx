import React, { useState, useEffect } from 'react';
import Scoreboard from './cards/Scoreboard';
import TopBar from './TopBar';

const nonExpandableTypes = ['EPL'];

const ScoreboardGrid = () => {
  const [scoreboardDataList, setScoreboardDataList] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.npoet.dev/scores');
        const data = await response.json();
        setScoreboardDataList(data);
      } catch (error) {
        console.error('Error fetching scoreboard data:', error);
      }
    };

    fetchData();

    const refreshInterval = setInterval(fetchData, 60000);
    return () => clearInterval(refreshInterval);
  }, []);

  const handleFilterChange = (category) => setFilter(category);
  const handleFilterReset = () => setFilter(null);

  const filteredScoreboards = scoreboardDataList.filter((scoreboard) => {
    const gameDate = new Date(scoreboard.date);
    const today = new Date();

    gameDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (filter === 'TODAY') {
      return gameDate.getTime() === today.getTime();
    }

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

    return gameDate >= fiveDaysAgo && gameDate <= sevenDaysFromNow;
  });

  return (
    <div>
      <TopBar onFilterChange={handleFilterChange} onFilterReset={handleFilterReset} />
      <div className="scoreboard-grid">
        {filteredScoreboards.map((scoreboardData, index) => {
          const isLive =
            scoreboardData.home_score !== undefined &&
            !(scoreboardData.time &&
              (scoreboardData.time.includes("Final") || scoreboardData.time.includes("FT")));
          const isFinal =
            scoreboardData.time &&
            (scoreboardData.time.includes("Final") || scoreboardData.time.includes("FT"));

          return (
            <Scoreboard
              key={index}
              data={scoreboardData}
              isLive={isLive}
              isFinal={isFinal}
              nonExpandable={nonExpandableTypes.includes(scoreboardData.type)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScoreboardGrid;
