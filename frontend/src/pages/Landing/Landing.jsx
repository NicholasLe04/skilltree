import React from 'react'
import Navbar from '../components/Navbar';
import logo from "../../assets/images/undraw_environment_iaus.png";
import "./Landing.css"
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <>
            <Navbar />
            <div className='landing'>
                <div className='logo'>
                    <img src={logo} width={800} height={800 - 266} />
                </div>
                <div className='welcome'>
                    <div className='wel'><h2>Welcome to skilltree</h2>
                        <Link className='link' to='/home'><button className='gstart'>Get Started!</button></Link></div>
                </div>
            </div>
        </>
    )
}

export default Landing