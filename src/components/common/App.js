import React  from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import ConfigPage from '../pages/ConfigPage'

export class App extends React.Component{

  render(){
    return(
      <Switch>
         <Route path="/" exact component={LoginPage} />
         <Route path="/home" component={HomePage} />
         <Route path="/config" component={ConfigPage} />
       </Switch>
    );
  }
}
