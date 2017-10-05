import React  from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

export class App extends React.Component{
  render(){
    return(
      <Switch>
         <Route path="/" exact component={LoginPage}/>
         <Route path="/home" component={HomePage}/>'
       </Switch>
    );
  }
}
