import React, { useRef, useEffect, useState } from 'react';
import { IVideo } from '../types/IVideo';

interface VideoCardProps {
  video: IVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount || 0);
  const [bookmarkCount, setBookmarkCount] = useState(video.bookmarkCount || 0);

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

    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef) observer.unobserve(currentVideoRef);
    };
  }, []);

  const handleLike = async () => {
    const response = await fetch(`/api/videos/${video._id}/${liked ? 'unlike' : 'like'}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }
  };

  const handleBookmark = async () => {
    const response = await fetch(`/api/videos/${video._id}/${bookmarked ? 'unbookmark' : 'bookmark'}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      setBookmarked(!bookmarked);
      setBookmarkCount(bookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
    }
  };

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
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handleLike}
            className={`px-4 py-2 rounded ${liked ? 'bg-red-500' : 'bg-gray-500'} text-white`}
          >
            {liked ? 'Unlike' : 'Like'} {likeCount}
          </button>
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded ${bookmarked ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
          >
            {bookmarked ? 'Unsave' : 'Save'} {bookmarkCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;