import React from 'react';
import ReactDOM from 'react-dom';
import './LoginPage.css';
import LoginForm from './LoginForm'




class InstructionText extends React.Component{
  render(){
    return(
      <div>
        <p>Faça o login para ter acesso</p>
        <br/>
      </div>
    )
  }
}

class WelcomeText extends React.Component{
  render(){
    return(
      <div>
        <h1>Bem-vindo ao Co-habitat Sistema</h1>
        <br/>
      </div>
    )
  }
}



class LoginBox extends React.Component {
  render() {
    return (

        <div className="container">
          <ImageComponent/>
          <WelcomeText/>
          <InstructionText/>
          <LoginForm/>
        </div>


    );
  }
}

 class LoginPage extends React.Component {
  render() {
    return (
          <LoginBox/>
    );
  }
}

class ImageComponent extends React.Component{
  render(){
    return(
      <div>
        <img src="logo-login.png" alt="Logo Coworking" className="logo"/>
        <br/>
      </div>
    );
  }
}

document.body.className = "login"
// // ========================================
// ReactDOM.render(<LoginPage/>, document.getElementById("root"));

export default LoginPage;
