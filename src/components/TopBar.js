// TopBar.js

import React from 'react';
import { FaFootballBall, FaFutbol, FaGlobeAmericas, FaGraduationCap } from 'react-icons/fa';

const TopBar = ({ onFilterChange, onFilterReset }) => {
    const handleAllFootball = () => {
        onFilterChange(['NFL', 'FBS', 'FCS']);
    };

    const handleCollegeFootball = () => {
        onFilterChange(['FBS', 'FCS']);
    };

    const handleAllSoccer = () => {
        onFilterChange('EPL');
    };

    return (
        <div className="top-bar">
            <button onClick={onFilterReset}>
                <FaGlobeAmericas title="Show All" />
            </button>
             <button onClick={handleAllFootball}>
                <FaFootballBall title="All Football" />
            </button>
            <button onClick={handleCollegeFootball}>
                <FaGraduationCap title="College Football" />
            </button>
            <button onClick={handleAllSoccer}>
                <FaFutbol title="All Soccer" />
            </button>
            <button onClick={() => onFilterChange('NFL')}>NFL</button>
            <button onClick={() => onFilterChange('FBS')}>FBS</button>
            <button onClick={() => onFilterChange('FCS')}>FCS</button>
            <button onClick={() => onFilterChange('EPL')}>EPL</button>
        </div>
    );
};

export default TopBar;
