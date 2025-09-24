// Final.js

import React from 'react';
import TeamLogo from '../TeamLogo';
import '../styles/Scoreboard.css';

const Final = ({ data, onHomeLogoClick, onAwayLogoClick }) => {
    const {
        home,
        home_logo,
        home_record,
        home_score,
        away,
        away_logo,
        away_score,
        away_record,
        pass_leader,
        rush_leader,
        rec_leader,
        headline,
        time
    } = data;

    return (
        <div className="final-game">
            <div className="team">
                <div style={{ cursor: 'pointer' }} onClick={() => onAwayLogoClick(data)}>
                    <TeamLogo src={away_logo} alt={away} />
                </div>
                <div className="info">
                    <h2>{away}</h2>
                    <p>{away_record}</p>
                </div>
                <div className="score">{away_score}</div>
            </div>
            <div className="versus">{time}</div>
            <div className="team">
                <div style={{ cursor: 'pointer' }} onClick={() => onHomeLogoClick(data)}>
                    <TeamLogo src={home_logo} alt={home} />
                </div>
                <div className="info">
                    <h2>{home}</h2>
                    <p>{home_record}</p>
                </div>
                <div className="score">{home_score}</div>
            </div>
            <div className="stats">
                {headline ? (
                    <p>{headline}</p>
                ) : (
                    <div className="stats-min">
                        <p>{pass_leader}</p>
                        <p>{rush_leader}</p>
                        <p>{rec_leader}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Final;
