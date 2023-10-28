import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Tree from './pages/Tree/Tree';
// import Create from './pages/Create';
import Profile from './pages/Profile/Profile';
import './App.css';


function Root() {
    return (
        <>
            <div className="Root">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    {/* <Route path="/create" element={<Create />} /> */}
                    <Route path="/tree/:treeID" element={<Tree />} />
                </Routes>
            </div>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );
}

export default App
