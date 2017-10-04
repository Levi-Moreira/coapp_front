import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const target = document.getElementById('root');




const node = (
    <App />
);


ReactDOM.render(node, target);
