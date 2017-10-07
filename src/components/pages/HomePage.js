import React from 'react';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';


class Content extends React.Component{


  render() {
    return (
      <div id="main">
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
              <div className="mensagem">
                  <p>Seja bem-vindo Sr(a)<span className="span">{this.props.first_name}</span></p>
              </div>

          </div>
      </div>
    );
  }
}



class HomePage extends React.Component {


  constructor(props) {
      super(props);

      this.state = {user_first_name: null};
      this.logout = this.logout.bind(this);
    }


  logout(){
    removeFromSession(PRIVATE_TOKEN);
    removeFromSession(USER);
    removeFromSession(COWORKING);

    history.push("/");
  }
  
  componentDidMount(){
    document.body.style.backgroundColor = '#e0e3cc';

    if(retrieveFromSession(PRIVATE_TOKEN)===null){
        history.push("/");
        return;
    }

    var user = retrieveFromSession(USER);
    this.setState({user_first_name : user.first_name});

  }

  render() {
    return (
      <div>
          <Navigation username={this.state.user_first_name} logout={this.logout}/>
          <Content first_name={this.state.user_first_name}/>
          <SlideMenu/>
      </div>
    );
  }
}

// document.body.className = "";
// ========================================

// ReactDOM.render(<LoginPage/>, document.getElementById("root"));
export default HomePage;
