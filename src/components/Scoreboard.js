// Scoreboard.js

import React from 'react';

const tvChannelIds = {
    "ABC": 19570,
    "ESPN": 10179,
    "ESPN2": 12444,
    "ESPNU": 71094,
    "SECN": 1021370001,
    "ACCN": 1263880001,
    "FOX": 20450,
    "FS1": 94653,
    "FS2": 69553,
    "BTN": 71605,
    "PAC12": 88172,
    "CBS": 19567,
    "CBSSN": 69495,
    "NFL NET": 45409,
    "NBC": 19568
};

const Scoreboard = ({ data, isLive }) => {
    const {
        home,
        home_mascot,
        home_logo,
        home_score,
        home_record,
        away,
        away_mascot,
        away_logo,
        away_score,
        away_record,
        time,
        quarter,
        tv,
        odds
    } = data;

    const generateTVLink = (channel) => {
        if (tvChannelIds[channel]) {
            const url = `https://www.fubo.tv/watch?channelId=${tvChannelIds[channel]}`;
            return <a href={url} target="_blank" rel="noopener noreferrer">{channel}</a>;
        }
        return channel;
    };

    return (
        <div className="scoreboard">
            {isLive ? (
                <div className="live-game">
                    <div className="team">
                        <img src={away_logo} alt={`${away} Logo`} />
                        <div className="info">
                            <h2>{away}</h2>
                            <p>{away_record}</p>
                        </div>
                        <div className="score">{away_score}</div>
                    </div>
                    <p>{away_record}</p>
                    <div className="versus">VS</div>
                    <div className="team">
                        <img src={home_logo} alt={`${home} Logo`} />
                        <div className="info">
                            <h2>{home}</h2>
                            <p>{home_record}</p>
                        </div>
                        <div className="score">{home_score}</div>
                    </div>
                    <p>{home_record}</p>
                    <div className="game-details">
                        <p>Time: {time}</p>
                        <p>Quarter: {quarter}</p>
                        <p>TV: {generateTVLink(tv)}</p>
                    </div>
                </div>
            ) : (
                <div className="scheduled-game">
                    <div className="team">
                        <img src={away_logo} alt={`${away} Logo`} />
                        <div className="info">
                            <h2>{away}</h2>
                            <p>{away_mascot}</p>
                            <p>{away_record}</p>
                        </div>
                    </div>
                    <div className="versus">VS</div>
                    <div className="team">
                        <img src={home_logo} alt={`${home} Logo`} />
                        <div className="info">
                            <h2>{home}</h2>
                            <p>{home_mascot}</p>
                            <p>{home_record}</p>
                        </div>
                    </div>
                    <div className="game-details">
                        <p>{time}</p>
                        <p>{generateTVLink(tv)}   |   {odds}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scoreboard;
