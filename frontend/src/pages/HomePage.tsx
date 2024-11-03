import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoThumbnail from '../components/VideoThumbnail';
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
    <div className="h-full flex flex-col bg-midnightblue">
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-4xl font-bold text-white">For You</h1>
        <button
          onClick={handleUploadClick}
          className="bg-neonpurple hover:midnightblue text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Upload Video
        </button>
      </div>

      {/* Video Grid - Full Screen */}
      <div className="flex-grow overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 h-full">
          {videos.map((video) => (
            <div
              key={video._id}
              onClick={() => navigate(`/feed/${video._id}`)}
              className="cursor-pointer"
            >
              <VideoThumbnail video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;