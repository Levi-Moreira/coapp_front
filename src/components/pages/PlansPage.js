import React from 'react';
import {SlideMenu, Navigation} from '../common/Navigation'
import {retrieveFromSession, removeFromSession} from '../../services/storage_acessor'
import {PRIVATE_TOKEN, COWORKING, USER} from '../../services/storage_acessor'
import history from '../../services/history';
import '../styles/ConfigPage.css'
import '../styles/Modals.css'
import {retrievePlansInfos,createNewPlansInfo, editPlansInfo, deletePlansInfos, BASE_URL} from '../../services/api_acessor'

class Content extends React.Component{

  constructor(props) {
      super(props);
      this.state = {plans_infos : null, editing_plans_info : { name:"", description:"", id:"", price:"", resource:"", room:"", quantity_hours:"", item:"", quantity:"" }, deleting_plans_info : { name:"", description:"", id:"", price:"", resource:"", room:"", quantity_hours:"", item:"", quantity:"" }}
      this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
      this.errorCompletionHangler =  this.errorCompletionHangler.bind(this);
      this.addPlansInfo = this.addPlansInfo.bind(this);
      this.editPlansInfo=this.editPlansInfo.bind(this);
      this.deletePlanssInfo = this.deletePlansInfo.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.openEditModal = this.openEditModal.bind(this);
      this.openDeleteModal = this.openDeleteModal.bind(this);
  }


  openCreatePlansModal(){
      document.getElementById("modal-create-plans").style.display = "block";
  }


  openEditModal(){
      document.getElementById("modal-plans-editar").style.display = "block";
  }

  openDeleteModal(){
      document.getElementById("modal-plans-delete").style.display = "block";
  }

  sucessCompletionHandler(data, status){
    this.setState({plans_infos : data.plans});
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  componentDidMount(){
      retrievePlansInfos(
        retrieveFromSession(COWORKING).id,
        retrieveFromSession(PRIVATE_TOKEN),
        this.sucessCompletionHandler,
        this.errorCompletionHangler);
  }

  addPlansInfo(info){
      var infos = this.state.plans_infos;
      infos.push(info);
      this.setState({plans_infos : infos});
  }


  editPlansInfo(info){
      var infos = this.state.plans_infos.filter(function(value, index, array){
          return value.id !== info.id;
      });
      infos.push(info);
      this.setState({plans_infos : infos});
    }

    deletePlansInfo(info){
        var infos = this.state.plans_infos.filter(function(value, index, array){
            return value.id !== info.id;
        });
        this.setState({plans_infos : infos});
      }

   onEdit(info){
      this.setState({editing_plans_info: info});
      this.openEditModal();
   }

   onDelete(info){
     this.setState({deleting_plans_info: info});
     this.openDeleteModal();
   }

  render() {
    var infos = [];
    if(this.state.plans_infos != null){
      infos = this.state.plans_infos;
    }

    return (
      <div id="main">

          <ModalAddPlans onFinishAdd={this.addPlansInfo}/>
          <ModalEditPlans onFinishEditing={this.editPlansInfo} plan={this.state.editing_plans_info}/>
          <ModalDeleteConfirm onFinishDeleting={this.deletePlansInfo} plan={this.state.deleting_plans_info}/>
          <div className="wrapper">
              <h1 className="titulo">Painel Administrativo</h1>
             
              <div className="contato cadastro">
                  <h2 className="subtitulo">Informações de Planos</h2>
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
                      <button onClick={this.openCreatePlansModal} className="btn-add">Adicionar Novo Plano</button>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

class ModalAddPlans extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name:'', description:'', price:'', resource:'', room:'', quantity_hours:'', item:'', quantity:''};
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({[event.target.name]: event.target.value});
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishAdd(data.plan);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    createNewPlansInfo(
      retrieveFromSession(COWORKING).id,
      this.state.name,
      this.state.description,
      this.state.price,
      this.state.resource,
      this.state.room,
      this.state.quantity_hours,
      this.state.item,
      this.state.quantity,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-create-plans").style.display = "none";
  }
  render(){
    return(
      <div id="modal-create-plans" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Adicionar Plano</h2>
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
                           <h3>Recursos:</h3>

                           <div className="styled-select blue semi-square">
                            <select name="resource" onChange={this.handleChange}>
                              <option value='1' name='resource'>Resource 1</option>
                              <option value='2' name='resource'>Resource 2</option>
                            </select>
                          </div>    

                           <h3>Quantidade de Horas(Recursos):</h3>
                           <input name="quantity_hours" type="text" placeholder="Quantidade de Horas(Recursos)" onChange={this.handleChange}/>
                           <h3>Salas:</h3>
                           <div className="styled-select blue semi-square">    
                              <select  name="room" onChange={this.handleChange}>
                                <option value='1' name='room'>Sala 1</option>
                                <option value='2' name='room'>Sala 2</option>    
                              </select>                
                          </div>  
                           <h3>Quantidade de horas(Salas):</h3>
                           <input name="quantity_hours" type="text" placeholder="Quantidade de Horas(Salas)" onChange={this.handleChange}/>
                           <h3>Item:</h3>
                           <div className="styled-select blue semi-square">    
                              <select  name="item" onChange={this.handleChange}>
                                <option value='1' name='item'>Item 1</option>
                                <option value='1' name='item'>Item 2</option>    
                              </select>                
                          </div>  
                           <h3>Quantidade:</h3>
                           <input name="quantity" type="text" placeholder="Quantidade Item" onChange={this.handleChange}/>
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

class ModalEditPlans extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sucessCompletionHandler = this.sucessCompletionHandler.bind(this);
    this.errorCompletionHangler = this.errorCompletionHangler.bind(this);
    this.state = {name:'', description:'', price:'', resource:'', room:'', quantity_hours:'', item:'', quantity:''};
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentWillReceiveProps(props){
    this.setState({
      name: props.plan.name,
      description: props.plan.description,
      price: props.plan.price,
      resource: props.plan.resource,
      room: props.plan.room,
      quantity_hours: props.plan.quantity_hours,
      item: props.plan.item,
      quantity: props.plan.quantity,
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishEditing(data.plan);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    editPlansInfo(
      retrieveFromSession(COWORKING).id,
      this.props.plan.id,
      this.state.name,
      this.state.description,
      this.state.price,
      this.state.resource,
      this.state.room,
      this.state.quantity_hours,
      this.state.item,
      this.state.quantity,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }

  closeModal(){
      document.getElementById("modal-plans-editar").style.display = "none";
  }

  render(){
    return(
      <div id="modal-plans-editar" className="modal modal_multi">
         <div className="modal-content">
           <div className="modal-header">
               <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
               <h2 className="subtitulo">Editar Planos</h2>
           </div>
           <div className="modal-body wrapp">
                   <div className="desc">
                       <form onSubmit={this.handleSubmit}  className="form">
                           <h3>Nome:</h3>
                           <input name="name" value={this.state.name} type="text" placeholder="Nome" onChange={this.handleChange}/>
                           <h3>Descrição:</h3>
                           <input name="description" value={this.state.description} type="text" placeholder="Descrição" onChange={this.handleChange}/>
                           <h3>Preço:</h3>
                           <input name="price" value={this.state.price} type="text" placeholder="Preço" onChange={this.handleChange}/>
                           <h3>Recursos:</h3>
                           <input name="resource" value={this.state.resource} type="text" placeholder="Recursos" onChange={this.handleChange}/>
                           <h3>Quantidade de Horas(Recursos):</h3>
                           <input name="quantity_hours" value={this.state.quantity_hours} type="text" placeholder="Quantidade de Horas(Recursos)" onChange={this.handleChange}/>
                           <h3>Salas:</h3>
                           <input name="room" value={this.state.room} type="text" placeholder="Salas" onChange={this.handleChange}/>
                           <h3>Quantidade de horas(Salas):</h3>
                           <input name="quantity_hours" value={this.state.quantity_hours} type="text" placeholder="Quantidade de Horas(Recursos)" onChange={this.handleChange}/>
                           <h3>Item:</h3>
                           <input name="item" value={this.state.item} type="text" placeholder="Item" onChange={this.handleChange}/>
                           <h3>Quantidade:</h3>
                           <input name="quantity" value={this.state.quantity} type="text" placeholder="Item" onChange={this.handleChange}/>
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
    this.state = {name:'', description:'', id:'', price:'', resource_id:'', room_id:'', quantity_hours:'', item_id:'', quantity:''};
  }

  componentWillReceiveProps(props){

    this.setState({
      id: props.plan.id,
      name: props.plan.name,
      description: props.plan.description,
      price: props.plan.price,
      resource: props.plan.resource,
      room: props.plan.room,
      quantity_hours: props.plan.quantity_hours,
      item: props.plan.item,
      quantity: props.plan.quantity,
    });
  }


  sucessCompletionHandler(data, status){
    this.closeModal();
    this.props.onFinishDeleting(this.props.plan);
  }

  errorCompletionHangler(error){
      console.log(error);
  }

  handleSubmit(event) {
    event.preventDefault();
    deletePlansInfos(
      retrieveFromSession(COWORKING).id,
      this.state.id,
      retrieveFromSession(PRIVATE_TOKEN),
      this.sucessCompletionHandler,
      this.errorCompletionHangler);
  }


  closeModal(){
      document.getElementById("modal-plans-delete").style.display = "none";
  }

  render(){
    return(
        <div id="modal-plans-delete" className="modal modal_multi excluir">
            <div className="modal-content">
              <div className="modal-header">
                  <span onClick={this.closeModal} className="close close_multi">&#xea0f;</span>
                  <h2 className="subtitulo">Excluir</h2>
              </div>
              <div className="modal-body wrapp">
                      <p>Tem certeza que deseja excluir esse plano?</p>
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
class PlansPage extends React.Component {


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


export default PlansPage;
