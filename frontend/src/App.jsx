import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import './App.css'

function Root() {
  return (
    <>
      <div className="Root">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
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
