import styled from 'styled-components';

export const Label = styled.label`
font-size: ${({ theme }) => theme.fontSize.xxl};
font-family: Verdana, sans-serif;
margin-top: 20px; // Dodaje odstęp od góry
padding-bottom: 6px; // Dodaje padding na dole, aby linia nie przylegała bezpośrednio do tekstu
border-bottom: 1px solid ${({ theme }) => theme.colors.grey}; // Dodaje szarą linię na dole
  `;