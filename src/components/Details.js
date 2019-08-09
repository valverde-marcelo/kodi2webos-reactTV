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
            <div class="details">
                <div class="background">
                    <div class="left">left</div>
                    <div class="right">right</div>
                </div>
                <div class="details-container">content here...</div>
            </div>
        );
    }
}