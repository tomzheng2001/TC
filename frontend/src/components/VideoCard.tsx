import React from 'react';

interface VideoCardProps {
  title: string;
  url: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, url, description }) => {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden">
      <h3 className="text-lg font-semibold p-4 bg-gray-200">{title}</h3>
      <video src={url} controls className="w-full h-48 object-cover"></video>
      <div className="p-4">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;