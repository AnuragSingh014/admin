import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Table from './pages/Table';
import SignIn from './pages/SignIn';
import Navbar from './Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/table" element={isAuthenticated ? <Table /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={!isAuthenticated ? <SignIn onLogin={handleLogin} /> : <Navigate to="/table" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/table" : "/signin"} />} />
      </Routes>
    </Router>
  );
};

export default App;

