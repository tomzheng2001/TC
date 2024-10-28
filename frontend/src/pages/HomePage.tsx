import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

interface Video {
  _id: string;
  title: string;
  url: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch('/api/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">Video Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map(video => (
          <VideoCard
            key={video._id}
            title={video.title}
            url={video.url}
            description={video.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;