import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { IVideo } from '../types/IVideo';
import { Link, useParams } from 'react-router-dom';

interface ProfileData {
  username: string;
  bio?: string;
  subscriptions: string[];
  subscribers: string[];
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<IVideo[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });        

        const data = await response.json();
  
        if (data.user) {
          setProfile({
            ...data.user
          });
          setUploadedVideos(data.uploadedVideos || []);
          setIsSubscribed(data.user.subscribers.includes(localStorage.getItem('userId') || ''));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, [userId]);

  const handleSubscriptionToggle = async () => {
    try {
      const response = await fetch(`/api/users/subscribe`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId: localStorage.getItem('userId'), creatorId: userId }),
      });
      if (response.ok) setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{profile.username}'s Profile</h1>

      {profile.bio && <p className="text-lg font-light mb-4">{profile.bio}</p>}
      
      <button
        onClick={handleSubscriptionToggle}
        className={`px-4 py-2 mt-2 rounded ${isSubscribed ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Uploaded Videos</h2>
      <div className="grid gap-4">
        {uploadedVideos.length > 0 ? (
          uploadedVideos.map(video => (
            <Link key={video._id} to={`/feed/${video._id}`}>
              <VideoCard key={video._id} video={video} />
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No videos uploaded yet.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-6">Subscriptions</h2>
      <p>Subscribers: {profile.subscribers.length}</p>
      <p>Subscriptions: {profile.subscriptions.length}</p>
    </div>
  );
};

export default Profile;