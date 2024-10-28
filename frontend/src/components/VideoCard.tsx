import React, { useRef, useEffect } from 'react';
import { IVideo } from '../types/IVideo';

interface VideoCardProps {
  video: IVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    const currentVideoRef = videoRef.current

    return () => {
      if (currentVideoRef) observer.unobserve(currentVideoRef);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        src={video.url}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
      />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-4 w-11/12 max-w-md rounded-lg text-white text-center">
        <h2 className="text-xl font-semibold">{video.title}</h2>
        <p className="text-sm mt-1">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;