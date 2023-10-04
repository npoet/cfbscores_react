// Scoreboard.js

import React, { useState } from 'react';
import Live from './Live'
import Final from './Final'
import Stats from './Stats'
import Scheduled from './Scheduled'

const Scoreboard = ({ data, isLive, isFinal }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`scoreboard ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
            {!isLive && !isFinal ? (
                <Scheduled data={data} />
            ) : (
                <></>
            )}
            {isLive ? (
                <Live data={data} />
            ) : (
                <></>
            )}
            {isFinal ? (
                <Final data={data} />
            ) : (
                <></>
            )}
            {isExpanded && (
                <Stats data={data} isLive={isLive} />
            )}
        </div>
    );
};

export default Scoreboard;
