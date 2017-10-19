import React from 'react';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';
import '../styles/ResourcesPage.css'
import '../styles/ConfigPage.css'
import '../styles/Modals.css'
import {retrieveItemsInfos,createNewItemsInfo, editItemsInfo, deleteItemsInfos, retrieveItemsTypes, BASE_URL} from '../../services/api_acessor'


class Content extends React.Component{

  constructor(props) {
      super(props);
      this.state = {items_infos : null, editing_items_info : { name:"", id:"", price:"", unity:"", description:"", type:"" }, deleting_items_info : { name:"", id:"", price:"", unity:"", description:"", type:"" }}
      this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
      this.errorCompletionHangler =  this.errorCompletionHangler.bind(this);
      this.addItemsInfo = this.addItemsInfo.bind(this);
      this.editItemsInfo=this.editItemsInfo.bind(this);
      this.deleteItemsInfo = this.deleteItemsInfo.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.openEditModal = this.openEditModal.bind(this);
      this.openDeleteModal = this.openDeleteModal.bind(this);
  }


  openCreateItemsModal(){
      document.getElementById("modal-create-items").style.display = "block";
  }


  openEditModal(){
      document.getElementById("modal-items-editar").style.display = "block";
  }

  openDeleteModal(){
      document.getElementById("modal-items-delete").style.display = "block";
  }

  sucessCompletionHandler(data, status){
    this.setState({items_infos : data.items});
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  componentDidMount(){
      retrieveItemsInfos(
        retrieveFromSession(COWORKING).id,
        retrieveFromSession(PRIVATE_TOKEN),
        this.sucessCompletionHandler,
        this.errorCompletionHangler);
  }

  addItemsInfo(info){
      var infos = this.state.items_infos;
      infos.push(info);
      this.setState({items_infos : infos});
  }


  editItemsInfo(info){
      var infos = this.state.items_infos.filter(function(value, index, array){
          return value.id != info.id;
      });
      infos.push(info);
      this.setState({items_infos : infos});
    }

  deleteItemsInfo(info){
        var infos = this.state.items_infos.filter(function(value, index, array){
            return value.id != info.id;
        });
        this.setState({items_infos : infos});
      }

   onEdit(info){
      this.setState({editing_items_info: info});
      this.openEditModal();
   }

   onDelete(info){
     this.setState({deleting_items_info: info});
     this.openDeleteModal();
   }

  render() {
    var infos = [];
    if(this.state.items_infos != null){
      infos = this.state.items_infos;
    }

    return (
      <div id="main">

          <ModalAddItems onFinishAdd={this.addItemsInfo}/>
          <ModalEditItems onFinishEditing={this.editItemsInfo} item={this.state.editing_items_info}/>
          <ModalDeleteConfirm onFinishDeleting={this.deleteItemsInfo} item={this.state.deleting_items_info}/>
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
        

              <div className="contato cadastro">
                  <h2 className="subtitulo">Informações de Itens</h2>
                  <div className="table">
                      <div className="th-cadastro">
                          <div className="cell top">Nome</div>
                          <div className="cell top">Preço</div>
                          <div className="cell top">Unidade</div>
                          <div className="cell top">Descrição</div>
                          <div className="cell top">Tipo</div>
                          <div className="cell top">Editor</div>
                      </div>

                      {infos.map(function(info, index){
                          return (
                            <div key={ info.id } className="row td-cadastro">
                              <div className="cell bottom">{info.name}</div>
                              <div className="cell bottom">{info.price}</div>
                              <div className="cell bottom">{info.unity}</div>
                              <div className="cell bottom">{info.description}</div>
                              <div className="cell bottom">{info.type}</div>
                              <div className="cell bottom">
                                  <a href="#" onClick={()=>this.onEdit(info)} className=""><span>&#xe905;</span></a>
                                  <a href="#" onClick={()=>this.onDelete(info)}  className=""><span>&#xe9ac;</span></a>
                              </div>
                          </div>
                        );

                      }, this)}
                      <button onClick={this.openCreateItemsModal} className="btn-add">Adicionar Novo Item</button>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

class ModalAddItems extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = { name:'', price:'', unity:'', description:'', type:'' };
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({[event.target.name]: event.target.value});
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishAdd(data.item);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewItemsInfo(
      retrieveFromSession(COWORKING).id,
      this.state.name,
      this.state.price,
      this.state.unity,
      this.state.description,
      this.state.type,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }
  

  closeModal(){
      document.getElementById("modal-create-items").style.display = "none";
  }
  render(){
    return(
      <div id="modal-create-items" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Adicionar Item</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">
                           <h3>Nome:</h3>
                           <input name="name" type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Preço:</h3>
                           <input name="price" type="text" placeholder="Preço" onChange={this.handleChange}/>
                           <h3>Unidade:</h3>
                           <input name="unity" type="text" placeholder="Unidade" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description" type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Tipo:</h3>
                           
                           <div className="styled-select blue semi-square">
                             
                            <select name="type" onChange={this.handleChange}>
                              <option value='1' name='type'>Consumivel</option>
                              <option value='2' name='type'>Serviço</option>
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

class ModalEditItems extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = { name:'', price:'', unity:'', description:'', type:'' };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentWillReceiveProps(props){
    this.setState({
      name: props.item.name,
      price: props.item.price,
      unity: props.item.unity,
      description: props.item.description,
      type: props.item.type,
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishEditing(data.item);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    editItemsInfo(
      retrieveFromSession(COWORKING).id,
      this.props.item.id,
      this.state.name,
      this.state.price,
      this.state.unity,
      this.state.description,
      this.state.type,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-items-editar").style.display = "none";
  }

  render(){
    return(
      <div id="modal-items-editar" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Editar Item</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">
                           <h3>Nome:</h3>
                           <input name="name" value={this.state.name} type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Preço:</h3>
                           <input name="price"  value={this.state.price} type="text" placeholder="Preço" onChange={this.handleChange}/>
                           <h3>Unidade:</h3>
                           <input name="unity"  value={this.state.unity} type="text" placeholder="Unidade" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description"  value={this.state.description} type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Tipo:</h3>
                           <div className="styled-select blue semi-square">  
                              <select name="type" value={this.state.type}  onChange={this.handleChange}>
                                  <option value='1' name="type">Consumivel</option>
                                  <option value='2' name="type">Serviço</option>
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

class ModalDeleteConfirm extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {id: '', name:'', price:'', unity:'', description:'', type:'' };
  }

  componentWillReceiveProps(props){

    this.setState({
      id: props.item.id,
      name: props.item.name,
      price: props.item.price,
      unity: props.item.unity,
      description: props.item.description,
      type: props.item.type,
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishDeleting(this.props.item);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    deleteItemsInfos(
      retrieveFromSession(COWORKING).id,
      this.state.id,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }


  closeModal(){
      document.getElementById("modal-items-delete").style.display = "none";
  }

  render(){
    return(
        <div id="modal-items-delete" className="modal modal_multi excluir">
            <div className="modal-content">
              <div className="modal-header">
                  <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
                  <h2 className="subtitulo">Excluir</h2>
              </div>
              <div className="modal-body wrapp">
                      <p>Tem certeza que deseja excluir esse item?</p>
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
class ItemsPage extends React.Component {


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


export default ItemsPage;
