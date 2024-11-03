import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faUpload,
  faVideo,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

interface MainLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isAuthenticated,
  handleLogout,
}) => {
  const userId = localStorage.getItem('userId');
  const { userId: paramUserId } = useParams<{ userId?: string }>();

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <header className="bg-midnightblue text-white p-4 shadow flex-none sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/" className="text-neonpurple hover:text-gray-200">TC</Link>
          </h1>
          <nav>
            {isAuthenticated ? (
              <>
                {userId !== paramUserId && (
                  <Link to={`/profile/${userId}`} className="text-neonpurple mr-4">My Profile</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-neonpurple text-white px-4 py-2 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <div>
                <Link to="/login" className="text-neonpurple mr-4">Login</Link>
                <Link to="/register" className="text-neonpurple">Register</Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto container min-w-full bg-midnightblue">{children}</main>

      <nav className="bg-midnightblue text-neonpurple flex justify-around items-center p-3 fixed bottom-0 inset-x-0">
        <Link to="/" className="text-center">
          <FontAwesomeIcon icon={faHome} size="lg" />
          <p className="text-xs mt-1">Home</p>
        </Link>
        <Link to="/search" className="text-center">
          <FontAwesomeIcon icon={faSearch} size="lg" />
          <p className="text-xs mt-1">Search</p>
        </Link>
        <Link to="/upload" className="text-center">
          <FontAwesomeIcon icon={faUpload} size="lg" />
          <p className="text-xs mt-1">Upload</p>
        </Link>
        <Link to="/feed" className="text-center">
          <FontAwesomeIcon icon={faVideo} size="lg" />
          <p className="text-xs mt-1">Feed</p>
        </Link>
        <Link to={`/profile/${userId}`} className="text-center">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <p className="text-xs mt-1">Profile</p>
        </Link>
      </nav>
    </div>
  );
};

export default MainLayout;