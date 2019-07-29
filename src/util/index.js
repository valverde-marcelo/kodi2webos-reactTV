import {is_static} from '../config';

export function imageFixURL(movie){
    movie.thumbnail = fixURL(movie.thumbnail);
    movie.art.fanart = fixURL(movie.art.fanart);
    movie.art.poster = fixURL(movie.art.poster);
};

function fixURL(src){
    //TODO: utilizar imagem local
    if(is_static){
        return "https://upload.wikimedia.org/wikipedia/en/1/15/Dunkirk_Film_poster.jpg";
    }
    return "http://192.168.15.2:8080/image/" + encodeURIComponent((src));
}