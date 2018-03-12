import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'; 
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import client from './client';
import AppContainer from './components/MainContainer';
import './scss/index.scss';
import LogStore from './stores/LogStore';

// const logStore = new LogStore();


// const stores = {
//   LogStore,
// }

ReactDOM.render(
  <Provider>
    <Router>
        <Route path="/" component={AppContainer} />
    </Router>
    {/* <AppContainer /> */}
  </Provider>
  ,
  document.getElementById('mount-point'));

  

window.app = client;
