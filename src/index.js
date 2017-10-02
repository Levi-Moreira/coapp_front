import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function LoginButton() {
  return <button  className="button btn-entrar" > Entrar </button>;
}


class TextInputLogin extends React.Component{
  render(){
    return(
      <div>
        <input type="text" placeholder="Usuário"/>
        <br/>
      </div>
    );
  }
}


class PasswordnputLogin extends React.Component{
  render(){
    return(
      <div>
        <input type="password" placeholder="Senha"/>
        <br/>
      </div>
    );
  }
}

class LoginForm extends React.Component{
  render(){
    return(
      <form className="form-login">
        <TextInputLogin/>
        <PasswordnputLogin/>
        <LoginButton/>
      </form>
    );
  }
}


class LoginBox extends React.Component {
  render() {
    return (
      <div className="container">
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

document.body.className = "login"

// ========================================

ReactDOM.render(<LoginPage/>, document.getElementById("root"));
