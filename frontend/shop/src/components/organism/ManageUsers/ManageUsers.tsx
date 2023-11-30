// W pliku ManageUsers.tsx

import React, { useState, useEffect } from 'react';
import { fetchAllUsers, giveAdminRole } from '../../../api/apiService';
import { User } from '../../../assets/types';
import styled from 'styled-components';

// Stylowanie...
const UsersWrapper = styled.div`
  // Stylowanie...
`;

const UserItem = styled.div`
  // Stylowanie...
`;

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Użycie typu User[]

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);

  const handleGiveAdminRole = async (userId: number) => {
    try {
      await giveAdminRole(userId);
      // Aktualizuj stan po zmianie roli
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, authorities: [{ authority: 'ADMIN' }] } // Zakładając, że rola zmienia się na 'ADMIN'
          : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <UsersWrapper>
      <h1>Zarządzanie użytkownikami</h1>
      {users.map((user: User) => ( 
        <UserItem key={user.id}>
          <p>Imię: {user.firstName}</p>
          <p>Nazwisko: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Telefon: {user.phoneNumber}</p>
          <p>Rola: {user.authorities.map(authority => authority.authority).join(', ')}</p>
          <button onClick={() => handleGiveAdminRole(user.id)}>Nadaj rolę admina</button>
        </UserItem>
      ))}
    </UsersWrapper>
  );
};

export default ManageUsers;
