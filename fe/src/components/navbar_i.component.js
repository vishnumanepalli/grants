import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/welcomeInstructor" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/ins_app" className="nav-link">Course Approval</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add Course</Link>
          </li>
          <li className="navbar-item">
          <Link to="/list" className="nav-link">Enroll List</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}