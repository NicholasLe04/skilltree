import React from 'react'
import Navbar from '../components/navbar';
import Hotbar from './Hotbar';
import Sidebar from './Sidebar';

function Home() {
  
  let compArr = [];
    for(let i=0;i<4;i++){
        compArr.push(<Hotbar key={i}/>);
    }
  return (
    <>
        <Navbar></Navbar>
        <Sidebar />
        <div className='body'>
          {compArr}
        </div>
    </>
  )
}

export default Home