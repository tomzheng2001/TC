import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { IVideo } from '../types/IVideo';

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold text-gray-800">Videos</h1>
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Upload Video
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos && videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
