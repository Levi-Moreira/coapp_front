import React  from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

export class App extends React.Component{
  constructor(props) {
      super(props);
      this.state = { public_token: 'null', coworking : 'null', user : 'null' };
      this.onSignInSucess = this.onSignInSucess.bind(this);
    }

    onSignInSucess(token, coworking, user){
        this.setState({public_token:token});
        this.setState({coworking:coworking});
        this.setState({user:user});

        console.log(this.state);
    }

  render(){
    return(
      <Switch>
         <Route path="/" exact render={() => <LoginPage onSignInSucess={this.onSignInSucess } />} />
         <Route path="/home" render={() => <HomePage {...this.state } />} />
       </Switch>
    );
  }
}
