import React, { useEffect, useState } from 'react';
import { IVideo } from '../types/IVideo';
import { useNavigate, useParams } from 'react-router-dom';
import VideoThumbnail from '../components/VideoThumbnail';

interface ProfileData {
    username: string;
    bio?: string;
    subscriptions: string[];
    subscribers: string[];
}

const Profile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [uploadedVideos, setUploadedVideos] = useState<IVideo[]>([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(Number);
    const [isSubscribeLoading, setIsSubscribeLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const data = await response.json();
                setProfile({
                    ...data.user
                });
                setUploadedVideos(data.uploadedVideos || []);
                setIsSubscribed(data.user.subscribers.includes(localStorage.getItem('userId') || ''));
                setSubscriberCount(data.user.subscribers.length);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleSubscriptionToggle = async () => {
        setSubscriberCount((count) => isSubscribed ? count - 1 : count + 1);
        setIsSubscribed((prevSubscribed) => !prevSubscribed);
        setIsSubscribeLoading(true);
    
        try {
            const response = await fetch(`/api/users/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId: localStorage.getItem('userId'), creatorId: userId }),
            });
    
            if (!response.ok) {
                setSubscriberCount((count) => isSubscribed ? count + 1 : count - 1);
                setIsSubscribed((prevSubscribed) => !prevSubscribed);
            }
        } catch (error) {
            setSubscriberCount((count) => isSubscribed ? count + 1 : count - 1);
            setIsSubscribed((prevSubscribed) => !prevSubscribed);
            console.error('Error subscribing:', error);
        } finally {
            setIsSubscribeLoading(false);
        }
    };

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="h-screen overflow-y-auto p-6 bg-midnightblue">
            <div className="flex flex-col items-center md:items-start md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-6">
                <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
                
                <div className="flex space-x-6 items-center text-white">
                    <div className="text-center">
                        <p className="font-semibold text-lg">{subscriberCount}</p>
                        <p className="text-sm text-gray-300">Subscribers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-lg">{profile.subscriptions.length}</p>
                        <p className="text-sm text-gray-300">Subscriptions</p>
                    </div>
                </div>

                {localStorage.getItem('userId') !== userId && (
                    <button
                        onClick={handleSubscriptionToggle}
                        disabled={isSubscribeLoading}
                        className={`px-6 py-2 rounded text-white ${isSubscribed ? 'bg-red-500' : 'bg-blue-500'}`}
                    >
                        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                )}
            </div>
            <h2 className="text-xl text-white font-semibold mt-4 mb-2">Uploaded Videos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedVideos.length > 0 ? (
                    uploadedVideos.map((video) => (
                        <div onClick={() => navigate(`/feed/${video._id}`)}
                        className="cursor-pointer">
                            <VideoThumbnail key={video._id} video={video} />
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-white">No videos uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
