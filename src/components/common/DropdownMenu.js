import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/DropdownMenu.css';

export class Dropdown extends React.Component {

   openDropdown() {
      document.getElementById("myDropdown").classList.toggle("show");
  }

  render() {
    return (
      <div className="dropdown">
          <li><a href="#" onClick={this.openDropdown} className="dropbtn">Teste<span>&#xf107;</span></a></li>
          <div id="myDropdown" className="dropdown-content">
              <a href="">Sair</a>
          </div>
      </div>
    );
  }
}
