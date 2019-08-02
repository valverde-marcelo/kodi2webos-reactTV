import { useState, useEffect } from "react";
import { wsp } from './rpc/index.js';
import { generate as uuid } from 'shortid';
import { imageFixURL } from './util';
import debug from './util/debug.js';
const logger = debug('useFetch');


function useFetch(request) {

  logger('executou useFetch');

  const [data, setData] = useState([]);

  //TODO: ver custom hooks
  useEffect(() => {
    
    const sendWSRequest2 = async (id, request) => {
      try {
        await wsp.open(); //aguardar a conexao abrir
        let data = await wsp.sendRequest(request, { requestId: id }); //apos conexao aberta, enviar requisição
        logger("mensagem recebida: " + data.id);
        
        //corrigir o encoded das URLs de imagens
        if (data && data.result && data.result.movies.length > 0) {
          data.result.movies.forEach(imageFixURL);
        }

        //atribuir valor ao state:data
        setData(data);
        
      } catch (err) {
        logger(err.message);
      }
    };

    sendWSRequest2(uuid(), request);

  }, []); // << super important array

  return data;
};

export default useFetch;