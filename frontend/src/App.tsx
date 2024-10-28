// frontend/src/App.tsx
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/test')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">NSFW Video App</h1>
      {error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <p className="text-xl text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default App;
