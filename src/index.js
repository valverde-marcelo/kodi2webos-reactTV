import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import ReactTV from 'react-tv';
import { withNavigation, withFocusable } from 'react-tv-navigation'
import './index.scss';
import App from './App';
import debug from './util/debug.js';

const logger = debug('index');
logger('Starting Kodi2WebOS');

const AppWithNavigation = withNavigation(App)

//ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'));
ReactDOM.render(<AppWithNavigation/>, document.getElementById('root'));