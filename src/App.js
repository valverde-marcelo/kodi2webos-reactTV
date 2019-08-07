import React from 'react';
import ReactTV from 'react-tv';

import Sidebar from './components/Sidebar';
import List from './components/List';
import Search from './components/Search';

import Navigation, { VerticalList, HorizontalList } from 'react-key-navigation';

import {getMovies} from './rpc/video-library.js';
import { wsp } from './rpc/index.js';
import { generate as uuid } from 'shortid';
import { imageFixURL } from './util';

import debug from './util/debug.js';

const logger = debug('App');
logger('Iniciou App');

class ReactTVApp extends React.Component {
  constructor() {
    super();

    this.state = {
      active: null,
      data: []
    }

    this.lists = ["Title 1"]
  }

  async componentDidMount() {
    try {
      const request = getMovies(5,10);
      const id = uuid();

      await wsp.open(); //aguardar a conexao abrir
      let data = await wsp.sendRequest(request, { requestId: id }); //apos conexao aberta, enviar requisição
      logger("mensagem recebida: " + data.id);

      //corrigir o encoded das URLs de imagens
      if (data && data.result && data.result.movies.length > 0) {
        data.result.movies.forEach(imageFixURL);
      }

      this.setState({ data: data });

    } catch (error) {
      logger(error);
    }

  }

  changeFocusTo(index) {
    this.setState({active: index});
  }

  onBlurLists() {
    this.setState({active: null});
  }

  render() {
    return (
      <Navigation>
        <div id="container">
          <HorizontalList>
            <Sidebar/>
            <div class="mainbox">
              <VerticalList navDefault>
                <Search/>
                <VerticalList id="content" onBlur={() => this.onBlurLists()}>
                  
                 {this.lists.map((list, i) =>
                    <List key={i} data={this.state.data} title={list} onFocus={() => this.changeFocusTo(i)} visible={this.state.active !== null ? i >= this.state.active : true}/>
                  )}
                </VerticalList>
              </VerticalList>
            </div>
          </HorizontalList>
        </div>
      </Navigation>
    );
  }
}

ReactTV.render(<ReactTVApp />, document.querySelector('#root'));
