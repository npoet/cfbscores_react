// Scheduled.js

import React from 'react';
import './Scoreboard.css';

const Scheduled = ({ data, onHomeLogoClick, onAwayLogoClick }) => {
    const {
        home_id,
        home,
        home_site,
        home_mascot,
        home_logo,
        home_record,
        away_id,
        away,
        away_site,
        away_mascot,
        away_logo,
        away_record,
        time,
        tv,
        odds
    } = data;

    return (
        <div className="scheduled-game">
            <div className="team">
                <img src={away_logo} alt={`${away} Logo`} onClick={() => onAwayLogoClick(data)} />
                <div className="info">
                    <h2><a href={away_site} target="_blank" rel="noopener noreferrer">{away}</a></h2>
                    <p>{away_mascot}</p>
                    <p>{away_record}</p>
                </div>
            </div>
            <div className="versus">VS</div>
            <div className="team">
                <img src={home_logo} alt={`${home} Logo`} onClick={() => onHomeLogoClick(data)} />
                <div className="info">
                    <h2><a href={home_site} target="_blank" rel="noopener noreferrer">{home}</a></h2>
                    <p>{home_mascot}</p>
                    <p>{home_record}</p>
                </div>
            </div>
            <div className="game-details">
                <p>{time}</p>
                <p>{tv}   |   {odds}</p>
            </div>
        </div>
    );
};

export default Scheduled;
