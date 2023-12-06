import React, { useState, useEffect } from 'react';
// import { Order } from 'assets/types'
import Button from '../../components/atoms/Button/Button'
import { useAuth } from '../../hooks/useApi'
import Address from '../../components/organism/Address/AddressList';
import { ProfileField, ProfileSection, ProfileValue, ButtonContainer, Label} from './Profile.styles';
import OrderHistory from '../../components/organism/OrderHistory/OrderHistory';
import SellHistory from '../../components/organism/SellHistory/SellHistory';
import styled from 'styled-components';
const StyledButton = styled(Button)`
  width: auto; /* Ustaw szerokość przycisku na dostosowaną do zawartości */
  padding: 10px 20px; /* Dodaj odstępy wewnątrz przycisku */
`;
const BigFontText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
  margin: 20px 0;
`;
const Profile = () => {
  const { signOut, user } = useAuth();

  return (
    <ProfileSection>
        <BigFontText>Dane użytkownika</BigFontText>
        <div>
          <ProfileField>
            <Label>Imię:</Label>
            <ProfileValue>{user?.firstName}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Nazwisko:</Label>
            <ProfileValue>{user?.lastName}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Email:</Label>
            <ProfileValue>{user?.email}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <Label>Numer telefonu:</Label>
            <ProfileValue>{user?.phoneNumber}</ProfileValue>
          </ProfileField>
        </div>
        <div>
          <BigFontText>Adres</BigFontText>
          {user && <Address />}
        </div>
      {user && <OrderHistory />}
      {user && <SellHistory />}
      <ButtonContainer>
        <StyledButton isbig onClick={signOut}>Wyloguj</StyledButton>
      </ButtonContainer>
    </ProfileSection>
  );
}

export default Profile