import debug from '../util/debug.js';
import { endpoint } from '../config';
import WebSocketAsPromised from 'websocket-as-promised';

const logger = debug('import rpc/index');
logger("websocket");

export const wsp = new WebSocketAsPromised(endpoint, {
  packMessage: data => JSON.stringify(data),
  unpackMessage: data => JSON.parse(data),
  attachRequestId: (data, requestId) => Object.assign({ id: requestId }, data), // attach requestId to message as `id` field
  extractRequestId: data => data && data.id,                                  // read requestId from message `id` field
});

export async function sendWSRequest(id, request) {
  try {
    await wsp.open();
    const response = await wsp.sendRequest(request, { requestId: id });
    return response;
  } catch (err) {
    logger(err.message);
  }
};


/*

          
          data.result.movies.forEach(function (item, key) {
            let aMovie = {
              id: item.movieid,
              image: item.thumbnail,
              imageBg: item.art.poster,
              title: item.label
            }
            movies.push(aMovie);
          });
          
 function sendWSRequest(request){
    wsp.open()
    .then(() => wsp.sendRequest(request, {requestId: request.id})) // actually sends {foo: 'bar', id: 'xxx'}, because `attachRequestId` defined above
    .then(response => logger(response));  // waits server message with corresponding requestId: {id: 'xxx', ...}
 }

//sendWSRequest(request).then(data => console.log(data.id));


    sendWSRequest(uuid(), request).then(function (data) {
      logger("mensagem recebida: " + data.id);
      if (data && data.result && data.result.movies.length > 0) {
        data.result.movies.forEach(imageFixURL);
        /*
        data.result.movies.forEach(function (item, key) {
          let aMovie = {
            id: item.movieid,
            image: item.thumbnail,
            imageBg: item.art.poster,
            title: item.label
          }
          movies.push(aMovie);
        });
        
      }
      setData(data);
    });

export const connection = new WebSocket(endpoint);

export async function getData(query) {

  let data = [];

  connection.onopen = function () {
    logger("conectado");
    message.id = "async send message";
    connection.send(videoLibrary.getMovies(message)); // Send the message 'Ping' to the server
    logger("mensagem enviada: " + query);
  };

  // Log errors
  connection.onerror = function (error) {
    logger('WebSocket Error ' + error);
  };

  connection.onmessage = function (response) {
    logger("mensagem recebida");
    logger(response);
    let data = JSON.parse(response.data);

    if (data && data.result && data.result.movies.length > 0) {
      data.result.movies.forEach(imageFixURL);
    }

    return data;
  };

  return data;
}


function scan(callback) {
  request('VideoLibrary.Scan', {}, callback);
}

function clean(callback) {
  request('VideoLibrary.Clean', {}, callback);
}

export default {
  message,
  getMovies,
  getTvShows,
  getSeasons,
  getEpisodes
};
 *
 */