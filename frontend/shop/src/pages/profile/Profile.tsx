import React, { useState, useEffect } from 'react';
// import { Order } from 'assets/types'
import Button from '../../components/atoms/Button/Button'
import { useAuth } from '../../hooks/useApi'
import Address from '../../components/organism/Address/AddressList';
import { ProfileField, ProfileSection, ProfileValue, ButtonContainer, Label} from './Profile.styles';
import OrderHistory from '../../components/organism/OrderHistory/OrderHistory';
import SellHistory from '../../components/organism/SellHistory/SellHistory';
import Preferency from '../../components/molecules/Preferency/Preferency';
import styled from 'styled-components';
export const QuarterWidthContainer = styled.div`
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
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
          <BigFontText>Adres</BigFontText>
          {user && <Address />}

        <BigFontText>Preferencje</BigFontText>
        <Preferency />
        <ContentContainer>
        {/* Komponent sprzedaży na 1/4 szerokości */}
        <QuarterWidthContainer>
          <BigFontText>Sprzedaż</BigFontText>
          {user && <SellHistory />}
        </QuarterWidthContainer>
        {/* Komponent zamówień na 1/4 szerokości */}
        <QuarterWidthContainer>
          <BigFontText>Zamówienia</BigFontText>
          {user && <OrderHistory />}
        </QuarterWidthContainer>
      </ContentContainer>
      <ButtonContainer>
        <StyledButton isbig onClick={signOut}>Wyloguj</StyledButton>
      </ButtonContainer>
    </ProfileSection>
  );
}

export default Profile