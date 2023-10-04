// TopBar.js

import React from 'react';

const TopBar = ({ onExpandAll, onFilterChange, onFilterReset }) => {
    return (
        <div className="top-bar">
            <button onClick={onExpandAll}>Expand All</button>
            <button onClick={onFilterReset}>Show All</button>
            <title>FBscores</title>
            <button onClick={() => onFilterChange('NFL')}>Show NFL</button>
            <button onClick={() => onFilterChange('College')}>Show College</button>
        </div>
    );
};

export default TopBar;