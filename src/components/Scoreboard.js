// Scoreboard.js

import React, { useState } from 'react';
import Live from './Live'
import Final from './Final'
import Stats from './Stats'
import Scheduled from './Scheduled'
import TeamInfoPopup from './TeamInfoPopup'; // Import the TeamInfoPopup component


const Scoreboard = ({ data, isLive, isFinal }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [teamInfoPopup, setTeamInfoPopup] = useState(null);


    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const onHomeLogoClick = () => {
        const { home_id, home_logo, home_mascot, home_record } = data;

        // Check if the game type is "FBS" before opening the popup
        if (data.type === 'FBS') {
            setTeamInfoPopup({
                team_id: home_id,
                team_logo: home_logo,
                team_mascot: home_mascot,
                team_record: home_record,
            });
        }
    };

    const onAwayLogoClick = () => {
        const { away_id, away_logo, away_mascot, away_record } = data;

        // Check if the game type is "FBS" before opening the popup
        if (data.type === 'FBS') {
            setTeamInfoPopup({
                team_id: away_id,
                team_logo: away_logo,
                team_mascot: away_mascot,
                team_record: away_record,
            });
        }
    };



    const closeTeamInfoPopup = () => {
        setTeamInfoPopup(null);
    };

    return (
        <div className={`scoreboard ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
            {!isLive && !isFinal ? (
                <Scheduled data={data} onHomeLogoClick={onHomeLogoClick} onAwayLogoClick={onAwayLogoClick} />
            ) : (
                <></>
            )}
            {isLive ? (
                <Live data={data} onHomeLogoClick={onHomeLogoClick} onAwayLogoClick={onAwayLogoClick} />
            ) : (
                <></>
            )}
            {isFinal ? (
                <Final data={data} onHomeLogoClick={onHomeLogoClick} onAwayLogoClick={onAwayLogoClick} />
            ) : (
                <></>
            )}
            {isExpanded && (
                <Stats data={data} isLive={isLive} />
            )}
            {teamInfoPopup && (
                <TeamInfoPopup teamInfo={teamInfoPopup} onClose={closeTeamInfoPopup} />
            )}
        </div>
    );
};

export default Scoreboard;
