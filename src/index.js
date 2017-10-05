
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import {App} from './components/App';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';


const rootEl = document.getElementById('root');
ReactDOM.render((
  <BrowserRouter>
      <App />
    </BrowserRouter>
), rootEl);
