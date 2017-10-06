import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, retrieveFromStorage, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';
import '../styles/ConfigPage.css'


class CoworkingInfoForm extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <form action="" className="form-1 col">
          <input type="text" placeholder="Nome" value=""/>
          <br/>
          <input type="text" placeholder="Site" value=""/>
          <br/>
          <input type="text" placeholder="CNPJ" value=""/>
          <br/>
          <input type="text" placeholder="Endereço" value=""/>
          <button className="btn-add">Salvar Alterações</button>
      </form>
    );
  }
}
class Content extends React.Component{

  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div className="main">
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
              <CoworkingInfoForm/>
              <div className="flex-grid">
                  <div className="logotipo col">
                      <h2 className="subtitulo">Logotipo</h2>
                      <p>
                          <img src="" alt="" height="50" width="50"/>
                      </p>
                      <form action="">
                          <button className="btn-small btn-cancelar">Apagar</button>
                          <button className="btn-small">Selecionar</button>
                      </form>
                  </div>
              </div>

              <div className="contato cadastro">
                  <h2 className="subtitulo">Informações de Contato</h2>
                  <div className="table">
                      <div className="th-cadastro">
                          <div className="cell top">Descrição</div>
                          <div className="cell top">Telefone</div>
                          <div className="cell top">E-mail</div>
                          <div className="cell top">Editor</div>
                      </div>

                          <div className="row td-cadastro">
                              <div className="cell bottom">Levi</div>
                              <div className="cell bottom">99999999</div>
                              <div className="cell bottom">ellcash_levi@hotmail.com</div>
                              <div className="cell bottom">
                                  <a href="#" className=""><span>&#xe905;</span></a>
                                  <a href="#" className=""><span>&#xe9ac;</span></a>
                              </div>
                          </div>
                      <button className="btn-add">Adicionar Novo Contato</button>
                  </div>
              </div>

          </div>
      </div>
    );
  }
}



class ConfigPage extends React.Component {


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

    // console.log(retrieveFromSession(PRIVATE_TOKEN));
    // sessionStorage.clear()
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


export default ConfigPage;
