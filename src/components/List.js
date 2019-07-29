import React from "react";
import { withFocusable } from 'react-tv-navigation';

import debug from '../util/debug.js';
const logger = debug('List');


const List = ({ focused, setFocus, data }) => {

    focused = (focused) ? 'focused' : 'unfocused';
    return (
        <div className='poster' onClick={() => { setFocus() }} >
            <h2>{'Lista: ' + data.id}</h2>
            {data.result && data.result.movies.length > 0 && (
                <ul>
                    {data.result.movies.map((movie) => (
                        <li key={movie.movieid.toString()}>{movie.label}</li>
                    ))}
                </ul>
            )}
        </div>

    );
};

const FocusableList = withFocusable(List);

export default FocusableList;