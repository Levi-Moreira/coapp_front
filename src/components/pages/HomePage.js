import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import {SlideMenu, Navigation} from '../common/Navigation'



class Content extends React.Component{
  render() {
    return (
      <div id="main">
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
              <div className="mensagem">
                  <p>Seja bem-vindo Sr(a)<span className="span">Teste</span></p>
              </div>

          </div>
      </div>
    );
  }
}



class HomePage extends React.Component {

  componentDidMount(){
    document.body.style.backgroundColor = '#e0e3cc';
    //
    console.log(this.props.public_token);
    // console.log(this.props.public_token);
  }

  render() {
    return (
      <div>
          <Navigation/>

          <Content/>
          <SlideMenu/>
      </div>
    );
  }
}

// document.body.className = "";
// ========================================

// ReactDOM.render(<LoginPage/>, document.getElementById("root"));
export default HomePage;
