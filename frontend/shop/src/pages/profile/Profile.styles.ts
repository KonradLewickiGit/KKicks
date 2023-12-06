import styled from 'styled-components';

export const ProfileSection = styled.section`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 50%; // Kontener zajmuje 80% szerokości dostępnej przestrzeni
  margin-left: auto; // Wyśrodkowanie kontenera
  margin-right: auto; // Wyśrodkowanie kontenera
`;
export const BigFontText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl}; /* Użyj rozmiaru czcionki z motywu */
  text-align: center; /* Wyśrodkuj tekst na środku */
  margin: 20px 0;
`;

export const ProfileField = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Verdana', sans-serif;
  margin-bottom: 10px;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: bold;
  }
`;
const RatingStar = styled.button`
  font-size: ${({ theme }) => theme.fontSize.s}; // Ustawienie mniejszej czcionki
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.colors.blue}; // Zmiana koloru przy najechaniu
  }
`;
const RatingStarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Label = styled.label`
  text-align: right;
  padding-right: 10px;
  display: flex;
  width: 50%;
  justify-content: flex-end; // Wyrównanie tekstu do prawej w swojej połowie
`;

export const ProfileValue = styled.span`
  text-align: left;
  padding-left: 10px;
  display: flex;
  width: 50%;
  justify-content: flex-start; // Wyrównanie tekstu do lewej w swojej połowie
`;


export const ButtonContainer = styled.div`
  text-align: right;
  width: 100%;
`;
