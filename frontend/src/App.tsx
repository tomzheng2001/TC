import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoUpload from './pages/VideoUpload';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <Link to="/" className="hover:text-gray-200">TC</Link>
            </h1>
            <nav>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <div>
                  <Link to="/login" className="mr-4 hover:underline">Login</Link>
                  <Link to="/register" className="hover:underline">Register</Link>
                </div>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            <Route path="/upload" element={<VideoUpload />} />
          </Routes>
        </main>

        <footer className="bg-gray-200 text-black text-center p-4">
          <p>&copy; 2024 TC. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;