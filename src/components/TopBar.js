// TopBar.js

import React, { useState, useEffect } from 'react';
import {
  FaFootballBall,
  FaFutbol,
  FaGlobeAmericas,
  FaGraduationCap,
  FaCalendarDay,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

const TopBar = ({ onFilterChange, onFilterReset }) => {
  const [theme, setTheme] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleAllFootball = () => {
    onFilterChange(['NFL', 'FBS', 'FCS']);
  };

  const handleCollegeFootball = () => {
    onFilterChange(['FBS', 'FCS']);
  };

  const handleAllSoccer = () => {
    onFilterChange('EPL');
  };

  const handleToday = () => {
    onFilterChange('TODAY');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="top-bar">
      <div className="filters">
        <button onClick={onFilterReset} title="Show All">
          <FaGlobeAmericas />
        </button>
        <button onClick={handleToday} title="Today">
          <FaCalendarDay />
        </button>
        <button onClick={handleAllFootball} title="All Football">
          <FaFootballBall />
        </button>
        <button onClick={handleCollegeFootball} title="College Football">
          <FaGraduationCap />
        </button>
        <button onClick={handleAllSoccer} title="All Soccer">
          <FaFutbol />
        </button>
      </div>
      <div className="theme-toggle">
        <button onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
