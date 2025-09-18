import React from 'react';

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
        <img
          src={away_logo || defaultLogo}
          alt={`${away} Logo`}
          onClick={() => onAwayLogoClick(data)}
          style={{ cursor: 'pointer' }}
        />
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
        <img
          src={home_logo || defaultLogo}
          alt={`${home} Logo`}
          onClick={() => onHomeLogoClick(data)}
          style={{ cursor: 'pointer' }}
        />
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
        <p>{tv} | {odds}</p>
      </div>
    </div>
  );
};

export default Scheduled;
