import React, {createRef, useEffect} from 'react'
import Navbar from '../components/Navbar';
import logo from "../../assets/images/undraw_environment_iaus.png";
import "./landing.css";
import { Link } from 'react-router-dom';

function Landing() {
    let wrapperRef = createRef();

    useEffect(() => {
        const wrapper = wrapperRef.current;
        wrapper.classList.toggle('logo-has-loaded')
    });
    

    return (
        <>
            <Navbar />
            <div className='landing'>
                <div ref={wrapperRef} className='logo'>
                    <img src={""} width={800} height={800-266}/>
                </div>
                <div className='welcome'>
                    <div className='wel'><h2>Welcome to skilltree</h2>
                    <Link className='link' to='/home'><button  className='gstart'>Get Started!</button></Link></div>
                </div>
            </div>
        </>
    )
}

export default Landing