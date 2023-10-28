import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
    <Link className='link' to="/Home"><h1 style={{margin:"0"}}>skill<span style={{color:"#2ed142"}}>tree</span></h1></Link>
        <div className="navbar-search">
        <input type="text" placeholder="Search" />
        <button>Search</button>
        </div>
        <ul className="navbar-list">
            <li className="navbar-item">Create</li>
            <li className="navbar-item">Profile</li>
        </ul>
    </div>
  );
}

export default Navbar;