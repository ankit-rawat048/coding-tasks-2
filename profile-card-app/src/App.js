import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCard from './components/ProfileCard';
import UserDetails from './components/UserDetails';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserDetails />} />
                <Route path="/profile" element={<ProfileCard />} />
            </Routes>
        </Router>
    );
}

export default App;
