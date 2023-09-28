// Scoreboard.js

import React from 'react';
import LiveGame from './LiveGame'
import Scheduled from './Scheduled'

const Scoreboard = ({ data, isLive }) => {
    return (
        <div className="scoreboard">
            {isLive ? (
                <LiveGame data={data} />
            ) : (
                <Scheduled data={data} />
            )}
        </div>
    );
};

export default Scoreboard;
