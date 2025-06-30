import React, { useEffect, useState } from 'react';

const User = () => {
  const [user, setUser] = useState({
    name: 'Darshan Vasani',
    location: 'Ahmedabad, Gujarat',
    avatar_url: '',
    bio: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://api.github.com/users/dpvasani');
      const data = await response.json();
      setUser((prev) => ({
        ...prev,
        name: data.name || prev.name,
        location: data.location || prev.location,
        avatar_url: data.avatar_url,
        bio: data.bio || '',
      }));
    };
    fetchUser();
  }, []);

  return (
    <div className="user-card user-card-horizontal">
      {user.avatar_url && (
        <div className="user-card-photo">
          <img src={user.avatar_url} alt="avatar" width="110" />
        </div>
      )}
      <div className="user-card-details">
        <div className="user-detail-row"><span className="user-detail-key">Name:</span> <span className="user-detail-value">{user.name}</span></div>
        <div className="user-detail-row"><span className="user-detail-key">Location:</span> <span className="user-detail-value">{user.location}</span></div>
        {user.bio && <div className="user-detail-row"><span className="user-detail-key">Bio:</span> <span className="user-detail-value user-bio">{user.bio}</span></div>}
      </div>
    </div>
  );
};

export default User;