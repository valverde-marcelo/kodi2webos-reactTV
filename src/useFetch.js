import React, { useState, useEffect } from "react";
import { sendWSRequest } from './rpc/index.js';
import videoLibrary from './rpc/video-library.js';
import { generate as uuid } from 'shortid';
import { imageFixURL } from './util';
import debug from './util/debug.js';
const logger = debug('useFetch');


function useFetch() {

    logger('executou useFetch');
  
    const [data, setData] = useState([]);
    const request = videoLibrary.getMovies();
  
    //TODO: ver custom hooks
    useEffect(() => {
  
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
          */
        }
        setData(data);
      });
  
    }, []); // << super important array
  
    return data;
  };

  export default useFetch;