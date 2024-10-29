import React, {useEffect, useState} from "react";
import VideoCard from "../components/VideoCard";
import {IVideo} from "../types/IVideo";

const HomePage: React.FC = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    useEffect(() => {
        fetch("/api/videos")
            .then((response) => response.json())
            .then((data) => setVideos(data))
            .catch((error) => console.error("Error fetching videos:", error));
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center my-8 text-gray-800">Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
