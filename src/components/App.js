import React  from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import {Fullscreen} from './Fullscreen'


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
