import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import {App} from './components/common/App';
import history from './services/history';

const rootEl = document.getElementById('root');
ReactDOM.render((
  <Router history={history}>
      <App />
    </Router>
), rootEl);
