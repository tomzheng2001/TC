import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoUpload from './pages/VideoUpload';
import VideoFeed from './pages/VideoFeed';
import MainLayout from './layouts/MainLayout';
import FullScreenLayout from './layouts/FullscreenLayout';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
                <HomePage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
              {isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
              {isAuthenticated ? <Navigate to="/" /> : <Register />}
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
                <VideoUpload />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout}>
                <Profile />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/feed/:videoId?"
          element={
            <FullScreenLayout>
              <VideoFeed />
            </FullScreenLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;