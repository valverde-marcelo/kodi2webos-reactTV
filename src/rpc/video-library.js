import { generate as uuid } from 'shortid';
import debug from '../util/debug.js';

const logger = debug('import rpc/video-library');

let message = {
  jsonrpc: '2.0',
  //id: "",
  method: "",
  params: {}
};

//TODO receber start e end como parametros
function getMovies() { 
    const params = {
      limits: {
        start: 0,
        end: 10
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
  
    //message.id = uuid();
    message.method = "VideoLibrary.GetMovies";
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

  export default {
    getMovies,
    getTvShows,
    getSeasons,
    getEpisodes
  };
  