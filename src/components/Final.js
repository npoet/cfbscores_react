// Final.js

import React from 'react';

const Final = ({ data }) => {
    const {
        home,
        home_logo,
        home_record,
        away,
        away_logo,
        away_record
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
            <p>{away_record}</p>
            <div className="versus">F</div>
            <div className="team">
                <img src={home_logo} alt={`${home} Logo`} />
                <div className="info">
                    <h2>{home}</h2>
                    <p>{home_record}</p>
                </div>
                <div className="score">{home_score}</div>
            </div>
            <p>{home_record}</p>
        </div>
    );
};

export default Final;
