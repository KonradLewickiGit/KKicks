// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../api/apiService';
import { User } from '../../assets/types';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserById(parseInt(userId)).then(setUser).catch(console.error);
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profil Użytkownika</h1>
      <p>Login: {user.username}</p>
      <p>Imię: {user.firstName}</p>
    </div>
  );
};

export default UserProfile;
