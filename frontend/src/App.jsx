import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tree from './pages/Tree/Tree';
import Landing from './pages/Landing/Landing';
import Profile from './pages/Profile/Profile';
import Create from './pages/Create/Create';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import './App.css';


function Root() {
    return (
        <>
            <div className="Root">
                <Routes>
                    <Route path="/" exact element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/tree/:treeID" element={<Tree />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<Search />} />
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
