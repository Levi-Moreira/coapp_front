import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/LoginPage';
import configureStore from './store/configureStore';
import {loginUserSuccess} from './actions';

const target = document.getElementById('root');
const store = configureStore(window.__INITIAL_STATE__);



const node = (
    <LoginPage store={store} />
);

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(node, target);
