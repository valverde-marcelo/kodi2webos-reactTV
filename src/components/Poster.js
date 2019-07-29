import React from "react";
import { withFocusable } from 'react-tv-navigation';

import debug from '../util/debug.js';
const logger = debug('Poster');


const Poster = ({ focused, setFocus, focusPath, src }) => {

    focused = (focused) ? 'focused' : 'unfocused';
    return (
        <div className='poster' onClick={() => { setFocus() }} >
            <img src={src} />
        </div>
    );
};

const FocusablePoster = withFocusable(Poster);

export default FocusablePoster;