import React, { useEffect, useState } from 'react';
import { IVideo } from '../types/IVideo';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';

const VideoFeed: React.FC = () => {
    const { videoId } = useParams<{ videoId?: string }>();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [videoIds, setVideoIds] = useState(new Set<string>()); // Track unique video IDs

    useEffect(() => {
        const fetchVideos = async () => {
          setLoading(true);
          const response = await fetch(`/api/videos/feed?page=${page}&limit=5`);
          const data: IVideo[] = await response.json();

          const uniqueVideos = data.filter((video) => !videoIds.has(video._id));

          setVideos((prevVideos) => [...prevVideos, ...uniqueVideos]);
          setVideoIds((prevIds) => {
              uniqueVideos.forEach((video) => prevIds.add(video._id));
              return prevIds;
          });
          
          setLoading(false);
        };
        const fetchInitialVideo = async () => {
            if (videoId) {
              setLoading(true);
              const response = await fetch(`/api/videos/${videoId}`);
              const data = await response.json();
              if (data && !videoIds.has(data._id)) {
                setVideos([data, ...videos]);
                setVideoIds((prevIds) => {
                    prevIds.add(videoId);
                    return prevIds;
                })
              }
              setLoading(false);
            }
        };
        if (videoId && page === 1 && videos.length === 0) {
            fetchInitialVideo().then(() => fetchVideos());
        } else {
            fetchVideos();
        }
    }, [page, videos, videoId, videoIds]);

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
