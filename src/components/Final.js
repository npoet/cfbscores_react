// Final.js

import React from 'react';

const Final = ({ data }) => {
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
        rec_leader
    } = data;

    return (
        <div className="final-game">
            <div className="team">
                <img src={away_logo} alt={`${away} Logo`} />
                <div className="info">
                    <h2>{away}</h2>
                    <p>{away_record}</p>
                </div>
                <div className="score">{away_score}</div>
            </div>
            <div className="versus">F</div>
            <div className="team">
                <img src={home_logo} alt={`${home} Logo`} />
                <div className="info">
                    <h2>{home}</h2>
                    <p>{home_record}</p>
                </div>
                <div className="score">{home_score}</div>
            </div>
            <div className="stats">
                <p>PASS: {pass_leader}</p>
                <p>RUSH: {rush_leader}</p>
                <p>REC: {rec_leader}</p>
            </div>
        </div>
    );
};

export default Final;
