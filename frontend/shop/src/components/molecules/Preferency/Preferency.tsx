import React from 'react';
import { useAuth } from '../../../hooks/useApi';
import { changeBrowserMode } from '../../../api/apiService';
import styled from 'styled-components';


const StyledButton = styled.button`
  // ... (Stylizacja przycisku)
`;

const Preferency = () => {
  const { user } = useAuth();

  const toggleBrowserMode = async () => {
    if (user) {
      try {
        await changeBrowserMode(user.id);
        // Tutaj zakładamy, że dane użytkownika są automatycznie aktualizowane
      } catch (error) {
        console.error('Error while changing browser mode:', error);
      }
    }
  };

  const buttonText = user?.browserMode === 'LIGHT' ? 'Zmień tryb na ciemny' : 'Zmień tryb na jasny';

  return (
    <div>
      <StyledButton onClick={toggleBrowserMode}>{buttonText}</StyledButton>
    </div>
  );
};

export default Preferency;
