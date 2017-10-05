import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/LoginPage.css';
import WebFont from 'webfontloader';
import {signIn} from '../../services/api_acessor'


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


  sucessCompletionHandler(data, status){
    console.log(data);
    console.log(status);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    signIn(this.state.username,
      this.state.password,
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
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
  componentDidMount(){
    document.body.style.backgroundColor = '#222222';
  }
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


// ReactDOM.render(<LoginPage/>, document.getElementById("root"));
export default LoginPage;
