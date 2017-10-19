import React from 'react';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';
import '../styles/ResourcesPage.css'
import '../styles/ConfigPage.css'
import '../styles/Modals.css'
import {retrieveResourcesInfos,createNewResourcesInfo, editResourcesInfo, deleteResourcesInfos, BASE_URL} from '../../services/api_acessor'


class Content extends React.Component{

  constructor(props) {
      super(props);
      this.state = {resources_infos : null, editing_resources_info : {name:"", description:"",id:"",price:""}, deleting_resources_info : {name:"",description:"",id:"",price:""}}
      this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
      this.errorCompletionHangler =  this.errorCompletionHangler.bind(this);
      this.addResourcesInfo = this.addResourcesInfo.bind(this);
      this.editResourcesInfo=this.editResourcesInfo.bind(this);
      this.deleteResourcesInfo = this.deleteResourcesInfo.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.openEditModal = this.openEditModal.bind(this);
      this.openDeleteModal = this.openDeleteModal.bind(this);
  }


  openCreateResourcesModal(){
      document.getElementById("modal-create-resources").style.display = "block";
  }


  openEditModal(){
      document.getElementById("modal-resources-editar").style.display = "block";
  }

  openDeleteModal(){
      document.getElementById("modal-resources-delete").style.display = "block";
  }

  sucessCompletionHandler(data, status){
    this.setState({resources_infos : data.resources});
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  componentDidMount(){
      retrieveResourcesInfos(
        retrieveFromSession(COWORKING).id,
        retrieveFromSession(PRIVATE_TOKEN),
        this.sucessCompletionHandler,
        this.errorCompletionHangler);
  }

  addResourcesInfo(info){
      var infos = this.state.resources_infos;
      infos.push(info);
      this.setState({resources_infos : infos});
  }


  editResourcesInfo(info){
      var infos = this.state.resources_infos.filter(function(value, index, array){
          return value.id != info.id;
      });
      infos.push(info);
      this.setState({resources_infos : infos});
    }

    deleteResourcesInfo(info){
     
        var infos = this.state.resources_infos.filter(function(value, index, array){
            return value.id != info.id;
        });
        this.setState({resources_infos : infos});
      }

   onEdit(info){
      this.setState({editing_resources_info: info});
      
      this.openEditModal();
   }

   onDelete(info){
     this.setState({deleting_resources_info: info});
     this.openDeleteModal();
   }

  render() {
    var infos = [];
    if(this.state.resources_infos != null){
      infos = this.state.resources_infos;
    }

    return (
      <div id="main">

          <ModalAddResources onFinishAdd={this.addResourcesInfo}/>
          <ModalEditResources onFinishEditing={this.editResourcesInfo} resource={this.state.editing_resources_info}/>
          <ModalDeleteConfirm onFinishDeleting={this.deleteResourcesInfo} resource={this.state.deleting_resources_info}/>
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>

              <div className="contato cadastro">
                  <h2 className="subtitulo">Informações do Recurso</h2>
                  <div className="table">
                      <div className="th-cadastro">
                          <div className="cell top">Nome</div>
                          <div className="cell top">Descrição</div>
                          <div className="cell top">Preço</div>
                          <div className="cell top">Editor</div>
                      </div>

                      {infos.map(function(info, index){
                          return (
                            <div key={ info.id } className="row td-cadastro">
                              <div className="cell bottom">{info.name}</div>
                              <div className="cell bottom">{info.description}</div>
                              <div className="cell bottom">{info.price}</div>
                              <div className="cell bottom">
                                  <a href="#" onClick={()=>this.onEdit(info)} className=""><span>&#xe905;</span></a>
                                  <a href="#" onClick={()=>this.onDelete(info)}  className=""><span>&#xe9ac;</span></a>
                              </div>
                          </div>
                        );

                      }, this)}
                      <button onClick={this.openCreateResourcesModal} className="btn-add">Adicionar Novo Rescurso</button>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

class ModalAddResources extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name: '', description:'', price:''};
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishAdd(data.resource);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewResourcesInfo(
      retrieveFromSession(COWORKING).id,
      this.state.name,
      this.state.description,
      this.state.price,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-create-resources").style.display = "none";
  }
  render(){
    return(
      <div id="modal-create-resources" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Adicionar Recursos</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">
                           <h3>Nome:</h3>
                           <input name="name" type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description" type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Preço:</h3>
                           <input name="price" type="text" placeholder="Preço" onChange={this.handleChange}/>
                       </form>
                       <div className="form-2">
                          <button onClick={this.closeModal} className="btn-grande btn-cancelar">Cancelar</button>
                          <button onClick={this.handleSubmit} className="btn-grande btn-salvar">Salvar</button>
                          
                      </div>
                   </div>
           </div>
         </div>
       </div>
    );
  }
}

class ModalEditResources extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name: '', description:'', price:''};
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentWillReceiveProps(props){
    
    this.setState({
      name: props.resource.name,
      description: props.resource.description,
      price: props.resource.price
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishEditing(data.resource);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    editResourcesInfo(
      retrieveFromSession(COWORKING).id,
      this.props.resource.id,
      this.state.name,
      this.state.description,
      this.state.price,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-resources-editar").style.display = "none";
  }

  render(){
    return(
      <div id="modal-resources-editar" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Editar Recursos</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">
                           <h3>Nome do Recurso:</h3>
                           <input name="name" value={this.state.name} type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description" value={this.state.description} type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Preço:</h3>
                           <input name="price" value={this.state.price} type="text" placeholder="Preço" onChange={this.handleChange}/>
                       </form>
                       <div className="form-2">
                          <button onClick={this.closeModal} className="btn-grande btn-cancelar">Cancelar</button>
                          <button onClick={this.handleSubmit} className="btn-grande btn-salvar">Salvar</button>
                          
                      </div>
                   </div>
           </div>
         </div>
       </div>

    );
  }
}

class ModalDeleteConfirm extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {id: '', name: '', description:'', price:''};
  }

  componentWillReceiveProps(props){

    this.setState({
      id: props.resource.id,
      name: props.resource.name,
      description: props.resource.description,
      price: props.resource.price
    });
  }

  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishDeleting(this.props.resource);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    deleteResourcesInfos(
      retrieveFromSession(COWORKING).id,
      this.state.id,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }


  closeModal(){
      document.getElementById("modal-resources-delete").style.display = "none";
  }

  render(){
    return(
        <div id="modal-resources-delete" className="modal modal_multi excluir">
            <div className="modal-content">
              <div className="modal-header">
                  <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
                  <h2 className="subtitulo">Excluir</h2>
              </div>
              <div className="modal-body wrapp">
                      <p>Tem certeza que deseja excluir esse recurso?</p>
                      <form action="" className="form-2">
                        <button onClick={this.closeModal} className="btn-grande btn-cancelar">Cancelar</button>
                        <button  onClick={this.handleSubmit} className="btn-grande btn-salvar">Confirmar</button>
                        
                     </form>
              </div>
            </div>
        </div>
    );
  }
}
class ResourcesPage extends React.Component {


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
          <SlideMenu />
      </div>
    );
  }
}


export default ResourcesPage;
