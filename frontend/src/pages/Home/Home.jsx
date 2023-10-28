import React, { createRef } from 'react'
import Navbar from '../components/Navbar';
import Hotbar from './Hotbar';
import Sidebar from './Sidebar';

function Home() {

  const category = [
    { category: "Trending",
      ref: createRef(),
      img: "https://cdn-icons-png.flaticon.com/512/1946/1946485.png"
    },
    { category: "Tech",
      ref: createRef(),
      img: "https://cdn-icons-png.flaticon.com/512/4257/4257487.png"
    },
    { category: "Creative",
      ref: createRef(),
      img: "https://cdn-icons-png.flaticon.com/512/91/91061.png",
    },
    { category: "Sports",
      ref: createRef(),
      img: "https://cdn-icons-png.flaticon.com/512/2158/2158445.png",
    },
    { category: "Academic",
      ref: createRef(),
      img: "https://cdn-icons-png.flaticon.com/512/4696/4696465.png",
    },
    { category: "Saved",
      ref: createRef(),
      img: "https://cdn-icons-png.flaticon.com/512/4974/4974965.png",
    },
    
  ]

  return (
    <>
        <Navbar></Navbar>
        <Sidebar category={category}/>
        <div className='body'>
          {category.map((e) => <Hotbar refz={e.ref} category={e.category} />)}
        </div>
    </>
  )
}

export default Home