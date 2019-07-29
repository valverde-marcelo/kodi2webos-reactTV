import debug from '../util/debug.js';

const logger = debug('import rpc/video-library');


function getMovies(start, end) {
  
  let message = {
    jsonrpc: '2.0',
    method: "VideoLibrary.GetMovies",
    params: {}
  };

  let params = {
    limits: {
      start: start,
      end: end
    },
    properties: [
      'art',
      'genre',
      'director',
      'trailer',
      'tagline',
      'plot',
      'plotoutline',
      'title',
      'originaltitle',
      'lastplayed',
      'runtime',
      'year',
      'playcount',
      'rating',
      'thumbnail',
      'file'
    ],
    sort: {
      method: 'sorttitle',
      ignorearticle: true
    }
  };

  message.params = params;

  return message;
};

function getTvShows(message) {
  const params = {
    properties: [
      'genre',
      'plot',
      'title',
      'lastplayed',
      'episode',
      'year',
      'playcount',
      'rating',
      'thumbnail',
      'studio',
      'mpaa',
      'premiered',
      'episodeguide',
      'watchedepisodes'
    ]
  };

  message.method = "VideoLibrary.GetTVShows";
  message.params = params;

  return JSON.stringify(message);
}

function getSeasons(tvshowid, message) {
  const params = {
    tvshowid,
    properties: [
      'season',
      'showtitle',
      'playcount',
      'episode',
      'thumbnail',
      'fanart',
      'tvshowid'
    ]
  };

  message.method = "VideoLibrary.GetSeasons";
  message.params = params;

  return JSON.stringify(message);
};

function getEpisodes(tvshowid, season, message) {
  const params = {
    tvshowid,
    season,
    properties: [
      'title',
      'thumbnail',
      'plot',
      'episode',
      'season',
      'tvshowid',
      'playcount'
    ]
  };

  message.method = "VideoLibrary.GetEpisodes";
  message.params = params;

  return JSON.stringify(message);
};

export {
  getMovies,
  getTvShows,
  getSeasons,
  getEpisodes
};
