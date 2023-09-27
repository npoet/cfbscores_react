// Scoreboard.js

import React from 'react';

const Scoreboard = ({ data }) => {
    const { home, home_mascot, home_logo, away, away_mascot, away_logo, time, tv, odds } = data;

    return (
        <div className="scoreboard">
            <div className="team">
                <img src={away_logo} alt={`${away} Logo`} />
                <div className="info">
                    <h2>{away}</h2>
                    <p>{away_mascot}</p>
                </div>
            </div>
            <div className="versus">VS</div>
            <div className="team">
                <img src={home_logo} alt={`${home} Logo`} />
                <div className="info">
                    <h2>{home}</h2>
                    <p>{home_mascot}</p>
                </div>
            </div>
            
            <div className="game-details">
                <p>{time}</p>
                <p>TV: {tv}  |  Odds: {odds}</p>
            </div>
        </div>
    );
};

export default Scoreboard;
