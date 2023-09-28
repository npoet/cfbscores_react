// Scoreboard.js

import React from 'react';
import Live from './Live'
import Scheduled from './Scheduled'

const Scoreboard = ({ data, isLive }) => {
    return (
        <div className="scoreboard">
            {isLive ? (
                <Live data={data} />
            ) : (
                <Scheduled data={data} />
            )}
        </div>
    );
};

export default Scoreboard;
