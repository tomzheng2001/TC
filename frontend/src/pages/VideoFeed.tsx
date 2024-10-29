import React, { useEffect, useState } from 'react';
import { IVideo } from '../types/IVideo';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';

const VideoFeed: React.FC = () => {
  const { videoId } = useParams<{ videoId?: string }>();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (page: number) => {
    setLoading(true);
    const response = await fetch(`/api/videos/feed?page=${page}&limit=5`);
    const data: IVideo[] = await response.json();

    setVideos((prevVideos) => [...prevVideos, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialVideo = async () => {
      if (videoId) {
        try {
          const response = await fetch(`/api/videos/${videoId}`);
          const initialVideo = await response.json();
          if (initialVideo) setVideos([initialVideo]);
        } catch (error) {
          console.error('Error fetching initial video:', error);
        }
      }
    };
    
    fetchInitialVideo(); // Load the initial video if `videoId` is present
    fetchVideos(page); // Load the first page of regular feed videos
  }, [page, videoId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {videos.map((video) => (
        <div key={video._id} className="snap-start h-screen">
          <VideoCard video={video} />
        </div>
      ))}
      {loading && <p className="text-center text-gray-500 my-4">Loading more videos...</p>}
    </div>
  );
};

export default VideoFeed;