// Order.styles.ts
import styled from 'styled-components';

export const Wrapper = styled.form`
  background-color: ${({ theme }) => theme.colors.lightGrey}; // Jasnoszare tło
  border-radius: 10px; // Zaokrąglone rogi
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 80%;
  max-width: 1000px;
  min-width: 300px;
  margin: 40px auto;

  & > button {
    margin: 20px auto 0 auto;
    max-width: 150px;
    padding: 16px 32px;

    &:first-of-type {
      margin-top: 30px;
    }
  }
`;

export const Label = styled.label`
  font-family: 'Verdana', sans-serif; // Ustawienie czcionki Verdana
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 700; // Pogrubienie dla nazwy kuriera
  display: flex;
  align-items: center;

  input[type="radio"] {
    margin-right: 10px;
    accent-color: ${({ theme }) => theme.colors.primary}; // Kolor dla checkboxa
  }
`;

export const Price = styled.span`
  font-weight: normal; // Niepogrubiona cena
  margin-left: 5px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Field = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  margin-bottom: 10px;
  width: 100%;

  & > span {
    font-weight: 700;
  }
`;
