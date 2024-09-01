import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
// import Task from './components/Task';
import 'boxicons/css/boxicons.min.css';
import './App.css';




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                {/* <Route path="/Task" element={<Task />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
