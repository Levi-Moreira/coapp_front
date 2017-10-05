
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import {App} from './components/common/App';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';


const rootEl = document.getElementById('root');
ReactDOM.render((
  <BrowserRouter>
      <App />
    </BrowserRouter>
), rootEl);
