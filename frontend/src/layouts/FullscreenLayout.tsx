import React from 'react';

interface FullScreenLayoutProps {
  children: React.ReactNode;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => {
  return <div className="h-screen overflow-hidden">{children}</div>;
};

export default FullScreenLayout;