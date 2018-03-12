import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import client from './client';
import AppContainer from './components/MainContainer';
import './scss/index.scss';

// const store = new RootStore(client);

ReactDOM.render(
  <Provider>
  <AppContainer />
  </Provider>
  ,
  document.getElementById('mount-point'));

// if (module.hot) {
//   module.hot.accept();
// }

window.app = client;
