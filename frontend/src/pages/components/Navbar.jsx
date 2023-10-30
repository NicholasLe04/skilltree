import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Navbar.css';
import MagGlass from '../../assets/images/mag_glass.svg'

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <Link className='title' to="/Home"><h1 style={{ margin: "0" }}>skilltree</h1></Link>
            <form className="navbar-search" onSubmit={(e) => {
                e.preventDefault()
                navigate(`/search?q=${document.querySelector("input").value}`)
            }}>
                <input type="text" placeholder="Search" />
                <button type="submit"><img src={MagGlass} width={15} height={17} /></button>
            </form>
            <ul className="navbar-list">
                <Link className='link' to='/create'><li className="navButton">Create</li></Link>
                <Link className='link' to="/profile/oscar"><li className="navButton">Profile</li></Link>
            </ul>
        </div>
    );
}

export default Navbar;