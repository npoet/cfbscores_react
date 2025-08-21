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

    const handleLogoClick = (team, type) => {
        const { [`${team}_id`]: id, [`${team}_logo`]: logo, [`${team}_mascot`]: mascot, [`${team}_record`]: record } = data;
        // check that game type is fbs and data exists before opening popup
        if (type === "FBS" && record !== "0-0") {
            setTeamInfoPopup({
                team_id: id,
                team_logo: logo,
                team_mascot: mascot,
                team_record: record,
            });
        }
    };

    const onHomeLogoClick = () => handleLogoClick("home", data.type);
    const onAwayLogoClick = () => handleLogoClick("away", data.type);

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
                <Stats data={data} isLive={isLive} isFinal={isFinal} />
            )}
            {teamInfoPopup && (
                <TeamInfoPopup teamInfo={teamInfoPopup} onClose={closeTeamInfoPopup} />
            )}
        </div>
    );
};

export default Scoreboard;
