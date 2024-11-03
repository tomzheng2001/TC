import React from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isAuthenticated, handleLogout }) => {
  const userId = localStorage.getItem('userId');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/" className="hover:text-gray-200">TC</Link>
          </h1>
          <nav>
            {isAuthenticated ? (
              <>
                <Link to={`/profile/${userId}`} className="mr-4 hover:underline">My Profile</Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <div>
                <Link to="/login" className="mr-4 hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">{children}</main>

      <footer className="bg-gray-200 text-black text-center p-4">
        <p>&copy; 2024 TC. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;