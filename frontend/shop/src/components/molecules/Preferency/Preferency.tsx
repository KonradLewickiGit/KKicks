import React from 'react';
import { useAuth } from '../../../hooks/useApi';
import { changeBrowserMode, changeFontSize } from '../../../api/apiService';
import Button from '../../atoms/Button/Button';
import styled from 'styled-components';
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Preferency = () => {
  const { user, updateUser } = useAuth();

  const toggleBrowserMode = async () => {
    if (user) {
      try {
        const updatedUser = await changeBrowserMode(user.id);
        updateUser(updatedUser);
      } catch (error) {
        console.error('Error while changing browser mode:', error);
      }
    }
  };

  const buttonText = user?.browserMode === 'LIGHT' ? 'Zmień tryb na ciemny' : 'Zmień tryb na jasny';


  return (
    <ButtonContainer>
    <Button onClick={toggleBrowserMode}>{buttonText}</Button>
  </ButtonContainer>
  );
};

export default Preferency;
