import React  from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import ConfigPage from '../pages/ConfigPage'
import ResourcesPage from '../pages/ResourcesPage'
import RoomsPage from '../pages/RoomsPage'
import ItemsPage from '../pages/ItemsPage'
import PlansPage from '../pages/PlansPage'

export class App extends React.Component{

  render(){
    return(
      <Switch>
         <Route path="/" exact component={LoginPage} />
         <Route path="/home" component={HomePage} />
         <Route path="/config" component={ConfigPage} />
         <Route path="/recursos" component={ResourcesPage} />
         <Route path="/salas" component={RoomsPage} />
         <Route path="/itens" component={ItemsPage} />
         <Route path="/planos" component={PlansPage} />
         
       </Switch>
    );
  }
}
