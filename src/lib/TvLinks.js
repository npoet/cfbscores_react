// TvLinks.js

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
    "NBC": 19568,
    "USA Net": 85678,
    "Off Air": 118905,
    "ESPN+": "https://www.espn.com/watch/collections/44763/ncaa-football-on-espn+-live-upcoming"
};

const GenerateTVLink = (channel) => {
    if (channel == "ESPN+") {
        return <a href={tvChannelIds['ESPN+']} target="_blank" rel="noopener noreferrer">{channel}</a>;
    }
    else if (tvChannelIds[channel]) {
        const url = `https://www.fubo.tv/watch?channelId=${tvChannelIds[channel]}`;
        return <a href={url} target="_blank" rel="noopener noreferrer">{channel}</a>;
    }
    return channel;
};

export default GenerateTVLink;