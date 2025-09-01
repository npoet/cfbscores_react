// Live.js

import React from 'react';
import GenerateTVLink from '../lib/TvLinks';
import './Scoreboard.css';

const Live = ({ data, onHomeLogoClick, onAwayLogoClick }) => {
    const {
        home,
        home_site,
        home_logo,
        home_score,
        home_record,
        away,
        away_site,
        away_logo,
        away_score,
        away_record,
        time,
        possession,
        ball_on,
        short_down_distance,
        tv
    } = data;

    return (
        <div className="live-game">
            <div className="team">
                <img src={away_logo} alt={`${away} Logo`} onClick={() => onAwayLogoClick(data)} />
                <div className="info">
                    <div className="name">
                        <h2><a href={away_site} target="_blank" rel="noopener noreferrer">{away}</a></h2>
                    </div>
                    <p>{away_record}</p>
                </div>
                {possession == "away" && <div className="poss">{'\u2B24'}</div>}
                <div className="score">{away_score}</div>
            </div>
            <div className="versus">VS</div>
            <div className="team">
                <img src={home_logo} alt={`${home} Logo`} onClick={() => onHomeLogoClick(data)} />
                <div className="info">
                    <h2><a href={home_site} target="_blank" rel="noopener noreferrer">{home}</a></h2>
                    <p>{home_record}</p>
                </div>
                {possession == "home" && <div className="poss">{'\u2B24'}</div>}
                <div className="score">{home_score}</div>
            </div>
            <div className="game-clock">
              {["Halftime", "Delayed", "Canceled"].includes(time)
                ? time
                : (!ball_on ? time : `${time}  |  ${short_down_distance}`)}
            </div>
            <div className="game-details">
                {ball_on ? (<p>Ball on {ball_on}</p>) : null}
                <p>TV: {GenerateTVLink(tv)}</p>
            </div>
        </div>
    );
};

export default Live;
