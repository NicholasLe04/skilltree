import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'

function Root() {
  return (
    <>
      <div className="Root">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return(
    <BrowserRouter>
        <Root/>
    </BrowserRouter>
  );
}

export default App
