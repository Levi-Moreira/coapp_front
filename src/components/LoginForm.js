import React from 'react';
import ReactDOM from 'react-dom';
import './LoginPage.css';


export default class LoginForm extends React.Component{
  constructor(props) {
      super(props);
      this.state = {username: '', password:''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

  handleSubmit(event) {
    this.props.onSubmit(this.state.username,this.state.password);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    return(
      <form className="form-login" onSubmit={this.handleSubmit}>
        <input name="username" className="input-login" value={this.state.username}  type="text" placeholder="Usuário" onChange={this.handleChange}/>
        <br/>
        <input name="password" className="input-login" value={this.state.password} type="password" placeholder="Senha" onChange={this.handleChange}/>
        <br/>
        <button  className="button btn-entrar" > Entrar </button>
      </form>
    );
  }
}
