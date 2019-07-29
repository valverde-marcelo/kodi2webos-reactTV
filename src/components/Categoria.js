import React from "react";
import { withFocusable } from 'react-tv-navigation';

import debug from '../util/debug.js';
const logger = debug('Categoria');

const Item = ({ focused, setFocus, src }) => {
    focused = (focused) ? 'focused' : 'unfocused';
    return (
        <div className='poster' onClick={() => { setFocus() }} >
            <img src={src} />
        </div>
    );
};

const FocusableItem = withFocusable(Item);

const Categoria = ({ data, title }) => {

    return (
        <div className='categoria'>
            <h2>{title}</h2>
            <div className='posters'>   
                {data.result && data.result.movies.length > 0 && (
                    data.result.movies.map((movie, i) => (
                        <FocusableItem key={movie.movieid} focusPath={movie.movieid.toString()} src={movie.thumbnail}/>
                    )) 
                )}
            </div>
        </div>
    );
};


export default Categoria;