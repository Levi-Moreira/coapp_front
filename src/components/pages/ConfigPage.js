import React from 'react';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';
import '../styles/ConfigPage.css'
import '../styles/Modals.css'
import {retrieveContactInfos,createNewContactInfo, BASE_URL} from '../../services/api_acessor'


class CoworkingInfoForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {coworking_name: '', coworking_site : '', coworking_cnpj:'', coworking_address:''};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    var coworking = retrieveFromSession(COWORKING);

    if(coworking!=null){
      this.setState({
        coworking_name: coworking.name,
        coworking_site: coworking.url,
        coworking_cnpj: coworking.cnpj,
        coworking_address : coworking.address
      });
    }else{
      history.push("/")
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    return(
      <form action="" className="form-1 col">
          <input type="text" name="coworking_name" placeholder="Nome" value={this.state.coworking_name} onChange={this.handleChange}/>
          <br/>
          <input type="text" name="coworking_site" placeholder="Site" value={this.state.coworking_site} onChange={this.handleChange}/>
          <br/>
          <input type="text" name="coworking_cnpj" placeholder="CNPJ" value={this.state.coworking_cnpj} onChange={this.handleChange}/>
          <br/>
          <input type="text" name="coworking_address" placeholder="Endereço" value={this.state.coworking_address} onChange={this.handleChange}/>
          <button className="btn-add">Salvar Alterações</button>
      </form>
    );
  }
}

class Content extends React.Component{

  constructor(props) {
      super(props);
      this.state = {contact_infos : null}
      this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
      this.errorCompletionHangler =  this.errorCompletionHangler.bind(this);
      this.addContactInfo = this.addContactInfo.bind(this);
  }


  openCreateContactModal(){
      document.getElementById("modal-create-contact").style.display = "block";
  }

  sucessCompletionHandler(data, status){
    this.setState({contact_infos : data.contact_infos});
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  componentDidMount(){
      retrieveContactInfos(
        retrieveFromSession(COWORKING).id,
        retrieveFromSession(PRIVATE_TOKEN),
        this.sucessCompletionHandler,
        this.errorCompletionHangler);
  }

  addContactInfo(info){
      var infos = this.state.contact_infos;
      infos.push(info);
      this.setState({contact_infos : infos});
  }

  render() {


    var infos = [];
    if(this.state.contact_infos != null){
      infos = this.state.contact_infos;
    }

    return (
      <div id="main">

          <ModaAddContact onFinishAdd={this.addContactInfo}/>

          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
              <CoworkingInfoForm/>
              <div className="flex-grid">
                  <div className="logotipo col">
                      <h2 className="subtitulo">Logotipo</h2>
                      <p>
                          <img src={BASE_URL+retrieveFromSession(COWORKING).logo} alt="" height="50" width="50"/>
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

                      {infos.map(function(info, index){
                          return (
                            <div key={ info.id } className="row td-cadastro">
                              <div className="cell bottom">{info.name}</div>
                              <div className="cell bottom">{info.phone}</div>
                              <div className="cell bottom">{info.email}</div>
                              <div className="cell bottom">
                                  <a href="" className=""><span>&#xe905;</span></a>
                                  <a href="" className=""><span>&#xe9ac;</span></a>
                              </div>
                          </div>
                        );

                      })}
                      <button onClick={this.openCreateContactModal} className="btn-add">Adicionar Novo Contato</button>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

class ModaAddContact extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name: '', phone:'', email:''};
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishAdd(data.contact_info);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewContactInfo(
      retrieveFromSession(COWORKING).id,
      this.state.name,
      this.state.phone,
      this.state.email,
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-create-contact").style.display = "none";
  }
  render(){
    return(
      <div id="modal-create-contact" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Adicionar Contato</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">
                           <h3>Descrição:</h3>
                           <input name="name" type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Telefone:</h3>
                           <input name="phone" type="text" placeholder="Telefone" onChange={this.handleChange}/>
                           <h3>E-mail:</h3>
                           <input name="email" type="text" placeholder="E-mail" onChange={this.handleChange}/>
                       </form>
                       <div className="form-2">
                          <button onClick={this.handleSubmit} className="btn-grande btn-salvar">Salvar</button>
                          <button onClick={this.closeModal} className="btn-grande btn-cancelar">Cancelar</button>
                      </div>
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
