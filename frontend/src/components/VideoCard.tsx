import React, { useRef, useEffect, useState } from 'react';
import { IVideo } from '../types/IVideo';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface VideoCardProps {
  video: IVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount || 0);
  const [bookmarkCount, setBookmarkCount] = useState(video.bookmarkCount || 0);
  const [creatorUsername, setCreatorUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCreatorUsername = async () => {
      const response = await fetch(`/api/users/${video.creatorId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCreatorUsername(data.username);
      } else {
        console.error('Failed to fetch creator username');
      }
    };
    getCreatorUsername();

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
  }, [video.creatorId]);

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

  const goToCreatorProfile = () => {
    navigate(`/profile/${video.creatorId}`);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={video.url}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
      />
      
      {/* Floating Text Overlay */}
      <div className="absolute bottom-10 left-4 bg-gray-900 bg-opacity-50 text-white p-3 rounded-md max-w-xs">
        <h2 className="text-lg font-bold">{video.title}</h2>
        <p className="text-sm mt-1 text-gray-200">{video.description}</p>
      </div>

      {/* Vertical Action Bar */}
      <div className="absolute bottom-10 right-4 flex flex-col items-center space-y-4">
        {/* Profile Placeholder */}
        <div
          onClick={goToCreatorProfile}
          className="cursor-pointer"
          title={creatorUsername || 'Unknown'}
        >
          <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-gray-400" />
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
            liked ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'
          }`}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className="text-xs ml-1">{likeCount}</span>
        </button>

        {/* Save Button */}
        <button
          onClick={handleBookmark}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
            bookmarked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
          }`}
        >
          <FontAwesomeIcon icon={faBookmark} />
          <span className="text-xs ml-1">{bookmarkCount}</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
