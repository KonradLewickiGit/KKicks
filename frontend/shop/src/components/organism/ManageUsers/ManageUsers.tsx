// W pliku ManageUsers.tsx

import React, { useState, useEffect } from 'react';
import { fetchAllUsers, giveAdminRole, deleteUserById } from '../../../api/apiService';
import { User } from '../../../assets/types';
import { ManagementWrapper, UserRow, StyledButton } from '../../molecules/ManageAdmin/ManageAdmin.styles';

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
  
  const handleDeactivateUser = async (userId: number) => {
    try {
      await deleteUserById(userId);
      // Aktualizuj stan użytkowników, ustawiając nonExpired na false
      setUsers(users.map(user => 
        user.id === userId ? { ...user, nonExpired: false } : user
      ));
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };


  return (
    <ManagementWrapper>
    <h1>Zarządzanie użytkownikami</h1>
    {users.map(user => (
      <UserRow key={user.id}>
        <div>Imię: {user.firstName}</div>
        <div>Nazwisko: {user.lastName}</div>
        <p>Email: {user.email}</p>
        <p>Telefon: {user.phoneNumber}</p>
        <p>Rola: {user.authorities.map(authority => authority.authority).join(', ')}</p>
        <p>Status: {user.nonExpired ? 'Konto aktywne' : 'Konto nieaktywne'}</p>
        <StyledButton onClick={() => handleGiveAdminRole(user.id)}>Zmień rolę</StyledButton>
        <StyledButton onClick={() => handleDeactivateUser(user.id)}>{user.nonExpired ? 'Dezaktywuj konto' : 'Aktywuj konto'}</StyledButton>
      </UserRow>
    ))}
  </ManagementWrapper>
);
};

export default ManageUsers;
