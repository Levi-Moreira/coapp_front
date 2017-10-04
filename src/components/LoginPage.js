import React from 'react';
import ReactDOM from 'react-dom';
import './LoginPage.css';
import WebFont from 'webfontloader';
import axios     from 'axios'

function LoginButton() {
  return <button  className="button btn-entrar" > Entrar </button>;
}


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


class LoginForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {username: '',password:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();


    var data = {user : {
      username: this.state.username,
      password: this.state.password
    }};

    var authOptions = {
       method: 'POST',
       url: 'http://www.cohabitat.com.br/api/v1/users/sign_in',
       data: JSON.stringify(data),
       headers: {
           'Authorization': 'Token 3795120644e36ad156daac35a989db2dad78e154',
           'Content-Type': 'application/json'
       },
       json: true
     };

     axios(authOptions)
      .then(function(response){
        console.log(response.data);
        console.log(response.status);
      })
      .catch(function(error){
        console.log(error);
      });
}

  render(){
    return(
      <form className="form-login" onSubmit={this.handleSubmit}>
        <input className="input-login" name="username" type="text" placeholder="Usuário"  value={this.state.username} onChange={this.handleChange}/>
        <br/>
        <input className="input-login" name="password" type="password" placeholder="Senha" value={this.state.password} onChange={this.handleChange}/>
        <br/>
        <LoginButton/>
      </form>
    );
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
// ========================================

// ReactDOM.render(<LoginPage/>, document.getElementById("root"));
export default LoginPage;
