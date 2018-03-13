import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'; 
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import client from './client';
import './scss/index.scss';


import AppContainer from './components/MainContainer';
import LoginContainer from './components/Login';
import RegisterContainer from './components/Register';
import LogTable from './components/LogTable';

import StudentStore from './stores/StudentStore';
import LogStore from './stores/LogStore';
import StateStore from './stores/StateStore';

const stores = {
  LogStore,
  StudentStore,
  StateStore,
}

window.stores = stores;

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <div>
        <Route exact path="/" component={AppContainer} />
        <Route path="/login" component={LoginContainer} />
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('mount-point'));

