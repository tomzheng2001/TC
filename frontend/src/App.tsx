import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoUpload from "./pages/VideoUpload";
import VideoFeed from "./pages/VideoFeed";
import MainLayout from "./layouts/MainLayout";
import FullScreenLayout from "./layouts/FullscreenLayout";
import AgeVerificationCard from "./components/AgeVerificationCard"; // Import the Age Verification Component

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ageVerified, setAgeVerified] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        // const ageVerification = localStorage.getItem("ageVerified") === "true";
        const ageVerification = false;
        setAgeVerified(ageVerification);
    }, []);

    const handleAgeConfirmation = () => {
        setAgeVerified(true);
        localStorage.setItem("ageVerified", "true");
    };

    return (
        <Router>
            {!ageVerified ? (
                <AgeVerificationCard onEnter={handleAgeConfirmation} />
            ) : (
                <Routes>
                    <Route path="/" element={
                        <MainLayout isAuthenticated={isAuthenticated} handleLogout={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}>
                            <HomePage />
                        </MainLayout>
                    }/>
                    <Route path="/login" element={
                        <MainLayout isAuthenticated={isAuthenticated} handleLogout={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}>
                            {isAuthenticated ? <Navigate to="/" /> : <Login />}
                        </MainLayout>
                    }/>
                    <Route path="/register" element={
                        <MainLayout isAuthenticated={isAuthenticated} handleLogout={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}>
                            {isAuthenticated ? <Navigate to="/" /> : <Register />}
                        </MainLayout>
                    }/>
                    <Route path="/upload" element={
                        <MainLayout isAuthenticated={isAuthenticated} handleLogout={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}>
                            <VideoUpload />
                        </MainLayout>
                    }/>
                    <Route path="/feed" element={
                        <FullScreenLayout>
                            <VideoFeed />
                        </FullScreenLayout>
                    }/>
                </Routes>
            )}
        </Router>
    );
};

export default App;
