import React from 'react';
import { IVideo } from '../types/IVideo';

interface VideoThumbnailProps {
  video: IVideo;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video }) => {
  return (
    <div className="relative overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition">
      <video
        src={video.url}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default VideoThumbnail;