// TopBar.js

import React from 'react';

const TopBar = ({ onFilterChange, onFilterReset }) => {
    return (
        <div className="top-bar">
            <button onClick={onFilterReset}>Show All</button>
            <title>FBscores</title>
            <button onClick={() => onFilterChange('NFL')}>NFL</button>
            <button onClick={() => onFilterChange('FBS')}>FBS</button>
            <button onClick={() => onFilterChange('FCS')}>FCS</button>
            <button onClick={() => onFilterChange('EPL')}>EPL</button>
        </div>
    );
};

export default TopBar;