import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/welcomeAdvisor" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/adv_app" className="nav-link">Courses Approval</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}