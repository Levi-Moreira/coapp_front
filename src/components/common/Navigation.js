import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Navigation.css';
import {Dropdown} from './DropdownMenu'


export class SlideMenu extends React.Component{

  closeSlideMenu(){
      document.getElementById("side-menu").style.width = "0px";
      document.getElementById("main").style.marginLeft = "0px";
  }


  render(){
    return(
      <div>
            <div id="side-menu" className="side-nav">
                <img src="http://cohabitat.com.br/static/frontend_cohabitat/img/logo_img.jpg" alt="Logo Coworking" className="logo-menu"/>
                <a href="#" className="btn-close" onClick={this.closeSlideMenu}><span>&#xea0f;</span></a>
                <a href="home" className="active"><span>&#xe900;</span>MENU</a>
                <a href="config"><span>&#xe994;</span>CONFIGURAÇÕES</a>
                <a href="recursos"><span>&#xe9a8;</span>RECURSOS</a>
                <a href="planos"><span>&#xe90e;</span>PLANOS</a>
                <a href="itens"><span>&#xe923;</span>ITENS</a>
                <a href="agenda"><span>&#xe900;</span>AGENDA</a>
                <a href="clientes"><span>&#xe972;</span>CLIENTES</a>
            </div>

      </div>
    );
  }
}

export class Navigation extends React.Component {

  openSlideMenu(){
    document.getElementById("side-menu").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
}

  render() {
    return (
      <nav className="navbar">
            <span className="open-slide">
                <a href="#" onClick={this.openSlideMenu}>
                    <svg width="30" height="30">
                        <path d="M0,5 30,5" stroke="#fff" stroke-width="5"/>
                        <path d="M0,14 30,14" stroke="#fff" stroke-width="5"/>
                        <path d="M0,23 30,23" stroke="#fff" stroke-width="5"/>
                    </svg>
                </a>
            </span>

        <ul className="navbar-nav">
            <li><a href="#"><span>&#xe986;</span></a></li>
            <Dropdown/>
            <li><a href="#"><img src="https://static-nv.mattel.com/HWCarCatalog/en-us/Images/Batman_330px_tcm985-130415.png" alt="Foto do Perfil" height="50" width="50"/></a></li>
        </ul>
      </nav>
    );
  }
}


// ========================================

// ReactDOM.render(<LoginPage/>, document.getElementById("root"));
