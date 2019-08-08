import React from 'react';
import ReactTV from 'react-tv';

import { Focusable } from 'react-key-navigation'

export default class Details extends React.Component {
    constructor() {
        super();

        this.state = {
            active: false
        }
    }

    setActive(status) {
        this.setState({ active: status });
    }

    render() {
        return (
            <div id="details" class={this.state.active ? 'focused' : ''}>
                <div id="icons">
                    <div><span class="fa fa-home"></span></div>
                </div>
            </div>
        );
    }
}