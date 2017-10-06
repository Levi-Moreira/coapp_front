import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/DropdownMenu.css';

export class Dropdown extends React.Component {

  constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    }


   openDropdown() {
      document.getElementById("myDropdown").classList.toggle("show");
  }

  logout(){
    this.props.logout();
  }

  render() {
    return (
      <div className="dropdown">
          <li><a href="#" onClick={this.openDropdown} className="dropbtn">{this.props.username}<span>&#xf107;</span></a></li>
          <div id="myDropdown" className="dropdown-content">
              <a href="#" onClick={this.logout}>Sair</a>
          </div>
      </div>
    );
  }
}
