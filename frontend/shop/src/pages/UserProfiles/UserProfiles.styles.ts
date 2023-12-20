import styled from 'styled-components';

export const UserProfileWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  min-width: 600px; // Ustaw minimalną szerokość kontenera
  word-wrap: break-word;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 50%; // Kontener zajmuje 50% szerokości dostępnej przestrzeni
  margin-left: auto; // Wyśrodkowanie kontenera
  margin-right: auto; // Wyśrodkowanie kontenera
`;

export const UserProfileField = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Verdana', sans-serif;
  margin-bottom: 10px;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: bold;
  }
`;

export const UserProfileValue = styled.span`
  text-align: left;
  padding-left: 10px;
  display: flex;
  width: 50%;
  justify-content: flex-start; // Wyrównanie tekstu do lewej w swojej połowie
`;

export const ProductListContainer = styled.div`
  margin-top: 20px;
`;

export const RatingDisplay = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize.m};
`;
