import React, { useState, useEffect } from 'react';
import './TeamInfoPopup.css';

const TeamInfoPopup = ({ teamInfo, onClose }) => {
    const { team_id, team_logo, team_mascot, team_record } = teamInfo;
    const [additionalInfo, setAdditionalInfo] = useState(null);
    const [seasonData, setSeasonData] = useState(null);
    const [recordData, setRecordData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data concurrently
                const [teamResponse, seasonResponse, recordResponse] = await Promise.all([
                    fetch(`http://localhost:8000/team/${encodeURIComponent(team_id)}`).then(res => res.json()),
                    fetch(`http://localhost:8000/season/${encodeURIComponent(team_id)}`).then(res => res.json()),
                    fetch(`http://localhost:8000/record/${encodeURIComponent(team_id)}`).then(res => res.json()),
                ]);

                // Set all the states with the fetched data
                setAdditionalInfo(teamResponse);
                setSeasonData(seasonResponse);
                setRecordData(recordResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [team_id]);

    // Display loading indicator while fetching data
    if (isLoading) {
        return (
            <div className="team-info-popup-overlay" onClick={onClose}>
                <div className="team-info-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="loading-indicator">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="team-info-popup-overlay" onClick={onClose}>
            <div className="team-info-popup" onClick={(e) => e.stopPropagation()}>
                <div className="team-info-header">
                    <span className="close-button" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className="team-info-content">
                    {recordData && (
                        <div className="left-column">
                            <img src={team_logo} alt={`${team_id} Logo`} className="team-logo" />
                            <div className="team-details">
                                <h2>{team_record}</h2>
                                <h1>{team_id}</h1>
                                <h4>{team_mascot}</h4>
                                <h3>Expected Wins: {recordData.exp_wins}</h3>
                                <h3>Conf. Record: {recordData.conference_wl}</h3>
                                <h3>Home Record: {recordData.home_wl}</h3>
                                <h3>Away Record: {recordData.away_wl}</h3>
                            </div>
                        </div>
                    )}
                    {additionalInfo && (
                        <div className="center-column">
                            <h2>Team Ratings</h2>
                            <h3>SP+ Ranking: {additionalInfo.sp_ovr_ranking}</h3>
                            <p>SP+ Overall Rating: {additionalInfo.sp_ovr_rating}</p>
                            <p>SP+ Off. Rating: {additionalInfo.sp_off_rating}</p>
                            <p>SP+ Def. Rating: {additionalInfo.sp_def_rating}</p>
                            <h3>ELO Rating: {additionalInfo.elo_ovr_rating}</h3>
                            <h3>FPI Overall Ranking: {additionalInfo.fpi_ovr_ranking}</h3>
                            <p>FPI Rating: {additionalInfo.fpi_ovr_rating}</p>
                            <p>FPI SoS Rank: {additionalInfo.fpi_sos}</p>
                            <p>FPI Game Control Rank: {additionalInfo.fpi_game_control}</p>
                            <p>SRS Rating: {additionalInfo.srs_ovr_rating}</p>
                        </div>
                    )}
                    {seasonData && (
                        <div className="right-column">
                            <h2>2024 Schedule</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Home</th>
                                        <th>Away</th>
                                        <th>Home Pts</th>
                                        <th>Away Pts</th>
                                        <th>PG Win%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seasonData.map((game, index) => (
                                        <tr key={index}>
                                            <td>{game.date}</td>
                                            <td>{game.home}</td>
                                            <td>{game.away}</td>
                                            <td>{game.home_score}</td>
                                            <td>{game.away_score}</td>
                                            <td>{game.pg_win_prob}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamInfoPopup;
