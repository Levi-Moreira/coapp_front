import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import LoginPage from './components/LoginPage'
import App from './components/App'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage}></IndexRoute>
  </Route>
);
