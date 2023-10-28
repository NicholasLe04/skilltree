import React, { createRef } from 'react'
import Navbar from '../components/Navbar';
import Hotbar from './Hotbar';
import Sidebar from './Sidebar';

function Home() {

  const category = [
    { category: "Trending",
      ref: createRef()
    },
    { category: "Tech",
      ref: createRef()
    },
    { category: "Creative",
      ref: createRef()
    },
    { category: "Sports",
      ref: createRef()
    },
    { category: "Academic",
      ref: createRef()
    },
    { category: "Saved",
      ref: createRef()
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