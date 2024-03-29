import styled from 'styled-components';
export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  font-family: 'Veranda', sans-serif;
  width: 100%; // Pełna szerokość kontenera

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center; // Wyśrodkowanie poziome
  align-items: center; // Wyśrodkowanie pionowe
  min-height: 80vh; // Minimalna wysokość, aby zapewnić, że formularz jest na środku
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Veranda', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xl};
  gap: 8px;
  width: calc(50% - 10px); // Odejmujemy 10px, aby uwzględnić gap

  @media (max-width: 768px) {
    width: 100%; // Na małych ekranach pełna szerokość
  }

  & > span {
    font-weight: 700;
  }
`;
