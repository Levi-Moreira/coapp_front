import React from 'react';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';
import '../styles/ResourcesPage.css'
import '../styles/ConfigPage.css'
import '../styles/Modals.css'
import {retrieveRoomsInfos, createNewRoomsInfo, editRoomsInfo, deleteRoomsInfos, retrieveRoomsTypes, BASE_URL} from '../../services/api_acessor'

class Content extends React.Component{

  constructor(props) {
      super(props);
      this.state = {rooms_infos : null,rooms_types : null, editing_rooms_info : {name:"", id:"", description:"", price_hour:"", price_month:"", type:""}, deleting_rooms_info : {name:"", id:"", description:"", price_hour:"", price_month:"", type:""}}
      this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
      this.errorCompletionHangler =  this.errorCompletionHangler.bind(this);
      this.addRoomsInfo = this.addRoomsInfo.bind(this);
      this.editRoomsInfo=this.editRoomsInfo.bind(this);
      this.deleteRoomsInfo = this.deleteRoomsInfo.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.openEditModal = this.openEditModal.bind(this);
      this.openDeleteModal = this.openDeleteModal.bind(this);
  }


  openCreateRoomsModal(){
      document.getElementById("modal-create-rooms").style.display = "block";
  }


  openEditModal(){
      document.getElementById("modal-rooms-editar").style.display = "block";
  }

  openDeleteModal(){
      document.getElementById("modal-rooms-delete").style.display = "block";
  }

  sucessCompletionHandler(data, status){
    this.setState({rooms_infos : data.rooms,
                  room_types: data.room_types,
    });
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  componentDidMount(){
      retrieveRoomsInfos(
        retrieveFromSession(COWORKING).id,
        retrieveFromSession(PRIVATE_TOKEN),
        this.sucessCompletionHandler,
        this.errorCompletionHangler);
  }

  addRoomsInfo(info){
      var infos = this.state.rooms_infos;
      infos.push(info);
      this.setState({rooms_infos : infos});
  }


  editRoomsInfo(info){
      var infos = this.state.rooms_infos.filter(function(value, index, array){
          return value.id != info.id;
      });
      infos.push(info);
      this.setState({rooms_infos : infos});
    }

    deleteRoomsInfo(info){
        var infos = this.state.rooms_infos.filter(function(value, index, array){
            return value.id != info.id;
        });
        this.setState({rooms_infos : infos});
      }
  
    
   onEdit(info){
      this.setState({editing_rooms_info: info});
      this.openEditModal();
   }

   onDelete(info){
     this.setState({deleting_rooms_info: info});
     this.openDeleteModal();
   }

  render() {
    var infos = [];
    if(this.state.rooms_infos !== null || this.state.rooms_types !== null){
      infos = this.state.rooms_infos;
    }
    

    return (
      <div id="main">

          <ModalAddRooms onFinishAdd={this.addRoomsInfo}/>
          <ModalEditRooms onFinishEditing={this.editRoomsInfo} room={this.state.editing_rooms_info}/>
          <ModalDeleteConfirm onFinishDeleting={this.deleteRoomsInfo} room={this.state.deleting_rooms_info}/>
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
              
              <div className="contato cadastro">
                  <h2 className="subtitulo">Informações de Salas</h2>
                  <div className="table">
                      <div className="th-cadastro">
                          <div className="cell top">Nome</div>
                          <div className="cell top">Descrição</div>
                          <div className="cell top">Preço(hora)</div>
                          <div className="cell top">Preço(mês)</div>
                          <div className="cell top">Tipo</div>
                          <div className="cell top">Editor</div>
                      </div>

                      {infos.map(function(info, index){
                          return (
                            <div key={ info.id } className="row td-cadastro">
                              <div className="cell bottom">{info.name}</div>
                              <div className="cell bottom">{info.description}</div>
                              <div className="cell bottom">{info.price_hour}</div>
                              <div className="cell bottom">{info.price_month}</div>
                              <div className="cell bottom">{info.type}</div>
                              <div className="cell bottom">
                                  <a href="#" onClick={()=>this.onEdit(info)} className=""><span>&#xe905;</span></a>
                                  <a href="#" onClick={()=>this.onDelete(info)}  className=""><span>&#xe9ac;</span></a>
                              </div>
                          </div>
                        );

                      }, this)}
                      <button onClick={this.openCreateRoomsModal} className="btn-add">Adicionar Nova Sala</button>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

class ModalAddRooms extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name: '', description:'', price_hour:'', price_month:'', type:''};
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({[event.target.name]: event.target.value});
    
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishAdd(data.room);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewRoomsInfo(
      retrieveFromSession(COWORKING).id,
      this.state.name,
      this.state.description,
      this.state.price_hour,
      this.state.price_month,
      this.state.type,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-create-rooms").style.display = "none";
  }
  render(){
    return(
      <div id="modal-create-rooms" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Adicionar Sala</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit} className="form">
                         
                           <h3>Nome:</h3>
                           <input name="name" type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description" type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Preço(hora):</h3>
                           <input name="price_hour" type="text" placeholder="Preço(hora)" onChange={this.handleChange}/>
                           <h3>Preço(mês):</h3>
                           <input name="price_month" type="text" placeholder="Preço(mês)" onChange={this.handleChange}/>
                           <h3>Tipo:</h3>
                           <input name="type" type="text" placeholder="Preço(mês)" onChange={this.handleChange}/>                          
                           <div className="styled-select blue semi-square">
                             
                            <select name="type" onChange={this.handleChange}>
                              <option value='1' name='type'>Exclusivo</option>
                              <option value='2' name='type'>Compartilhado</option>
                            </select>
                          </div>    
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

class ModalEditRooms extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name: '', description:'', price_hour:'', price_month:'', type:''};
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  

  componentWillReceiveProps(props){
    this.setState({
      name: props.room.name,
      description: props.room.description,
      price_hour: props.room.price_hour,
      price_month: props.room.price_month,
      type: props.room.type,
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishEditing(data.room);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    editRoomsInfo(
      retrieveFromSession(COWORKING).id,
      this.props.room.id,
      this.state.name,
      this.state.description,
      this.state.price_hour,
      this.state.price_month,
      this.state.type,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-rooms-editar").style.display = "none";
  }

  render(){
    return(
      <div id="modal-rooms-editar" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Editar Sala</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">              
                           <h3>Nome:</h3>
                           <input name="name" value={this.state.name} type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description" value={this.state.description} type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Preço(hora):</h3>
                           <input name="price_hour" value={this.state.price_hour} type="text" placeholder="Preço(hora)" onChange={this.handleChange}/>
                           <h3>Preço(mês):</h3>
                           <input name="price_month" value={this.state.price_month} type="text" placeholder="Preço(mês)" onChange={this.handleChange}/>
                           <h3>Tipo:</h3>
                           <div className="styled-select blue semi-square">   
                           
                            <select name="type" value={this.state.type}  onChange={this.handleChange}>
                              <option value='1'>Exclusivo</option>
                              <option value='2'>Compartilhado</option>
                            </select>
                            
                          </div>   
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


class ModalDeleteConfirm extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name: '', description:'', price_hour:'', price_month:'', type:''};
  }

  componentWillReceiveProps(props){

    this.setState({
      id: props.room.id,
      name: props.room.name,
      description: props.room.description,
      price_hour: props.room.price_hour,
      price_month: props.room.price_month,
      type: props.room.type,
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishDeleting(this.props.room);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    deleteRoomsInfos(
      retrieveFromSession(COWORKING).id,
      this.state.id,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }


  closeModal(){
      document.getElementById("modal-rooms-delete").style.display = "none";
  }

  render(){
    return(
        <div id="modal-rooms-delete" className="modal modal_multi excluir">
            <div className="modal-content">
              <div className="modal-header">
                  <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
                  <h2 className="subtitulo">Excluir</h2>
              </div>
              <div className="modal-body wrapp">
                      <p>Tem certeza que deseja excluir essa sala?</p>
                      <form action="" className="form-2">
                        <button  onClick={this.handleSubmit} className="btn-grande btn-salvar">Confirmar</button>
                        <button onClick={this.closeModal} className="btn-grande btn-cancelar">Cancelar</button>
                     </form>
              </div>
            </div>
        </div>
    );
  }
}
class RoomsPage extends React.Component {


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


export default RoomsPage;
