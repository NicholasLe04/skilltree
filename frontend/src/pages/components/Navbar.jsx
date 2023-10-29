import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <Link className='link' to="/Home"><h1 style={{ margin: "0" }}>skilltree</h1></Link>
            <div className="navbar-search">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    navigate(`/search?q=${document.querySelector("input").value}`)
                }}>
                    <input type="text" placeholder="Search" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <ul className="navbar-list">
                <li className="navbar-item">Create</li>
                <Link className='link' to="/profile"><li className="navbar-item">Profile</li></Link>
            </ul>
        </div>
    );
}

export default Navbar;