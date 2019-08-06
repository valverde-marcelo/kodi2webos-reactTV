import React from 'react';
import ReactTV from 'react-tv';

import { Focusable, HorizontalList } from 'react-key-navigation';

import debug from './util/debug.js';

const logger = debug('List');
logger('Iniciou List');

class ToogleItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
  }

  render() {
    return (
      <Focusable onFocus={() => this.setState({ active: true })}
        onBlur={() => this.setState({ active: false })}
        onEnterDown={() => logger(this.props.id)}>
        <div id={this.props.id} class={'item ' + (this.state.active ? 'item-focus' : '')}></div>
      </Focusable>
    );
  }
};

export default class List extends React.Component {
  constructor() {
    super();
    this._lastFocus = null;
  }

  componentDidMount() {
    const width = (Math.floor(this.content.scrollWidth / this.content.clientWidth) * this.content.clientWidth) + this.content.clientWidth + 20;
    if (this.content.getElementsByClassName('hz-list')[0]) {
      this.content.getElementsByClassName('hz-list')[0].style.width = width + 'px';
    }
  }

  onFocus(index) {
    if (this._lastFocus === index) {
      return;
    }

    if (this.props.onFocus) {
      this.props.onFocus();
    }

    if (this.content) {
      const items = this.content.getElementsByClassName('item');
      const offsetWidth = items[0].offsetWidth + 20;
      this.content.scrollLeft = offsetWidth * index;
    }

    this._lastFocus = index;
  }

  render() {
    logger(this.props.data);
    return (
      <div class={"contentgroup " + (this.props.visible ? '' : 'fading-out')}>
        <h1>{this.props.title}</h1>
        <div class="content" ref={(content) => { this.content = content }}>
          <HorizontalList class="hz-list"
            key={this.props.title}
            style={{ overflow: 'hidden', display: 'block' }}
            onFocus={(index) => this.onFocus(index)}
            onBlur={() => { this._lastFocus = null }}>
            
            <ToogleItem id={this.props.title + '_1'} />
            <ToogleItem id={this.props.title + '_2'} />
            <ToogleItem id={this.props.title + '_3'} />

          </HorizontalList>
        </div>
      </div>
    );
  }
}

/*

{this.props.data.result && this.props.data.result.movies.length > 0 && (
              this.props.data.result.movies.map((movie, i) => (
                <ToogleItem id={i} key={i} />
              ))
            )}

*/