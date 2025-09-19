import React from 'react';
import TeamLogo from './TeamLogo';

const Scheduled = ({ data, onHomeLogoClick, onAwayLogoClick }) => {
  const {
    home,
    home_site,
    home_mascot,
    home_logo,
    home_record,
    away,
    away_site,
    away_mascot,
    away_logo,
    away_record,
    time,
    tv,
    odds,
    type,
  } = data;

  const defaultLogo = '/helmet.png';

  const detailsText =
    tv && !tv.includes("Off Air")
      ? `${tv} | ${odds}`
      : `${odds}`;

  const getFormColor = (char) => {
    if (type === "EPL") {
      switch (char.toUpperCase()) {
        case 'W': return 'green';
        case 'L': return 'red';
        case 'D': return 'white';
        default: return 'inherit';
      }
    }
    return 'inherit';
  };

  const renderForm = (form) => {
    if (type === "EPL" && form) {
      return form.split('').map((char, idx) => (
        <span key={idx} style={{ color: getFormColor(char), marginRight: '2px' }}>
          {char}
        </span>
      ));
    }
    return form;
  };

  return (
    <div className="scoreboard-card scheduled-game">
      <div className="team">
        <div
          style={{ cursor: 'pointer', position: 'relative' }}
          onClick={() => onAwayLogoClick(data)}
        >
          <TeamLogo src={away_logo} alt={away} />
        </div>
        <div className="info">
          <h2>
            <a href={away_site} target="_blank" rel="noopener noreferrer">{away}</a>
          </h2>
          <p>{renderForm(away_mascot)}</p>
          <p>{away_record}</p>
        </div>
      </div>

      <div className="versus">VS</div>

      <div className="team">
        <div
          style={{ cursor: 'pointer', position: 'relative' }}
          onClick={() => onHomeLogoClick(data)}
        >
          <TeamLogo src={home_logo} alt={home} />
        </div>
        <div className="info">
          <h2>
            <a href={home_site} target="_blank" rel="noopener noreferrer">{home}</a>
          </h2>
          <p>{renderForm(home_mascot)}</p>
          <p>{home_record}</p>
        </div>
      </div>

      <div className="game-details">
        <p>{time}</p>
        <p>{detailsText}</p>
      </div>
    </div>
  );
};

export default Scheduled;
