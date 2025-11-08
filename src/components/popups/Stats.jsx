// Stats.js

import React from 'react';
import '../styles/Scoreboard.css';

const Stats = ({ data, isLive, isFinal }) => {
    const {
        home,
        home_record,
        home_conf,
        home_pass,
        home_rush,
        home_rec,
        away,
        away_record,
        away_conf,
        away_pass,
        away_rush,
        away_rec,
        pass_leader,
        rush_leader,
        rec_leader,
        last_play,
        down_distance,
        win_prob,
        gamecast,
        box_score,
        highlights,
        description
    } = data;
    
    return (
        <div className="stats">
            {isLive ? (
                <div>
                    <div className="stat">
                        <h3><p>Game Leaders:</p></h3>
                        <p>{pass_leader}</p>
                        <p>{rush_leader}</p>
                        <p>{rec_leader}</p>
                    </div>
                    <div className="stat">
                        <h3><p>Situation:</p></h3>
                        <p>{down_distance}</p>
                    </div>
                    <div className="stat">
                        <h3><p>Last Play:</p></h3>
                        <p>{last_play}</p>
                    </div>
                    {win_prob && (
                      <div className="stat">
                        <h3><p>Win Probability:</p></h3>
                        <p>{win_prob}</p>
                      </div>
                    )}
                </div>
            ) : isFinal ? (
                <div>
                    <div>
                        <p>{pass_leader}</p>
                        <p>{rush_leader}</p>
                        <p>{rec_leader}</p>
                    </div>
                    <div className="stat">
                        <h3><a href={box_score} target="_blank" rel="noopener noreferrer">Box Score</a></h3>
                    </div>
                    <div className="stat">
                        <p>{description}</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="stat">
                        <h3><p>{away} {away_record}</p></h3>
                        <p>Leaders:</p>
                        <p>{away_pass}</p>
                        <p>{away_rush}</p>
                        <p>{away_rec}</p>
                    </div>
                    <div className="stat">
                        <h3><p>{home} {home_record}</p></h3>
                        <p>Leaders:</p>
                        <p>{home_pass}</p>
                        <p>{home_rush}</p>
                        <p>{home_rec}</p>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Stats;
