// Admin.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Stylowanie komponentu
const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AdminPanel = styled.div`
background-color: ${({ theme }) => theme.colors.lightGrey};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; // Ustawia elementy równomiernie rozłożone
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminLink = styled(Link)`
  flex-basis: calc(50% - 20px); // Ustawia podstawową szerokość elementów
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  text-align: center; // Centruje tekst

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 600px) {
    flex-basis: calc(100% - 20px); // Pełna szerokość na małych ekranach
  }
`;

const Admin = () => {
  return (
    <AdminWrapper>
      <h1>Panel Administracyjny</h1>
      <AdminPanel>
        <AdminLink to="/admin/users">Zarządzanie użytkownikami</AdminLink>
        <AdminLink to="/admin/products">Zarządzanie produktami</AdminLink>
        <AdminLink to="/admin/questions">Zarządzanie pytaniami</AdminLink>
        <AdminLink to="/admin/orders">Zamówienia</AdminLink>
      </AdminPanel>
    </AdminWrapper>
  );
};

export default Admin;
