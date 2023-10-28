import React from 'react'
import Navbar from '../components/navbar';
import Hotbar from './Hotbar';
import Sidebar from './Sidebar';

function Home() {
  
  const category = ["Trending", "Tech", "Creative", "Sports", "Academic", "Saved"];
  let compArr = [];
    for(let i=0;i<category.length;i++){
        compArr.push(<Hotbar key={i}  category={category[i]}/>);
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