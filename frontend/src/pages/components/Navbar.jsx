import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Navbar.css';
import MagGlass from '../../assets/images/mag_glass.svg'

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <Link className='link' to="/Home"><h1 style={{ margin: "0" }}>skilltree</h1></Link>
            <form className="navbar-search" onSubmit={(e) => {
                e.preventDefault()
                navigate(`/search?q=${document.querySelector("input").value}`)
            }}>
                <input type="text" placeholder="Search" />
                <button type="submit"><img src={MagGlass} width={15} height={17} /></button>
            </form>
            <ul className="navbar-list">
                <li className="navbar-item">Create</li>
                <Link className='link' to="/profile"><li className="navbar-item">Profile</li></Link>
            </ul>
        </div>
    );
}

export default Navbar;