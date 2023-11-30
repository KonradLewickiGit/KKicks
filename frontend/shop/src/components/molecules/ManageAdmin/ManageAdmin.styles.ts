import styled from 'styled-components';

// Wrapper dla całego komponentu zarządzania
export const ManagementWrapper = styled.div`
  font-family: 'Verdana', sans-serif;
  margin: 20px;
  display: grid;
  gap: 10px; // Odstępy między wierszami
`;

// Stylowanie dla każdego wiersza użytkownika
export const UserRow = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc; // Linia oddzielająca wiersze

  &:last-child {
    border-bottom: none; // Usuń linię na dole ostatniego wiersza
  }
`;

// Stylowanie dla przycisków
export const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.darkGrey};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;

// Możesz dodać więcej stylowanych komponentów według potrzeb...
