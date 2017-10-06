
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Router, Route } from 'react-router-dom'
import {App} from './components/common/App';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import history from './services/history';

const rootEl = document.getElementById('root');
ReactDOM.render((
  <Router history={history}>
      <App />
    </Router>
), rootEl);
