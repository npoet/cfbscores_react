import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import TopBar from './TopBar';
import Footer from './Footer';

const nonExpandableTypes = ['EPL'];

const ScoreboardGrid = () => {
  const [scoreboardDataList, setScoreboardDataList] = useState([]);
  const [filter, setFilter] = useState(null);
  const [hasLiveGames, setHasLiveGames] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/scores');
      const data = await response.json();
      setScoreboardDataList(data);

      // check if live games exist
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const live = data.some((scoreboard) => {
        const gameDate = new Date(scoreboard.date);
        gameDate.setHours(0, 0, 0, 0);

        const isToday = gameDate.getTime() === today.getTime();
        const isLive =
          scoreboard.home_score !== undefined &&
          !(scoreboard.time &&
            (scoreboard.time.includes('Final') || scoreboard.time.includes('FT')));

        return isToday && isLive;
      });
      setHasLiveGames(live);
    } catch (error) {
      console.error('Error fetching scoreboard data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // initial fetch
  }, []);

  useEffect(() => {
    // refresh interval depends on whether live games exist
    const intervalMs = hasLiveGames ? 30000 : 1800000; // 30 sec vs 30 min
    const refreshInterval = setInterval(fetchData, intervalMs);

    return () => clearInterval(refreshInterval);
  }, [hasLiveGames]);

  const handleFilterChange = (category) => setFilter(category);
  const handleFilterReset = () => setFilter(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredScoreboards = scoreboardDataList.filter((scoreboard) => {
    const gameDate = new Date(scoreboard.date);
    const today = new Date();

    gameDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (filter === 'TODAY') {
      return gameDate.getTime() === today.getTime();
    }

    if (filter === 'LIVE') {
      const isLive =
        gameDate.getTime() === today.getTime() &&
        scoreboard.home_score !== undefined &&
        !(scoreboard.time &&
          (scoreboard.time.includes('Final') || scoreboard.time.includes('FT')));
      return isLive;
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
    <div className="page-container">
      <TopBar
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
        hasLiveGames={hasLiveGames}
      />
      <div className="scoreboard-grid">
        {filteredScoreboards.map((scoreboardData, index) => {
          const isLive =
            scoreboardData.home_score !== undefined &&
            !(scoreboardData.time &&
              (scoreboardData.time.includes('Final') || scoreboardData.time.includes('FT')));
          const isFinal =
            scoreboardData.time &&
            (scoreboardData.time.includes('Final') || scoreboardData.time.includes('FT'));

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
      <Footer />
    </div>
  );
};

export default ScoreboardGrid;
