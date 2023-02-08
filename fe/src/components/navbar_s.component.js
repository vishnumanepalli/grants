import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/welcomeUser" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/cour_off" className="nav-link">Courses Offered</Link>
          </li>
          <li className="navbar-item">
          <Link to="/enroll" className="nav-link">Courses Registered</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}