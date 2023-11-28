import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 40px auto 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: #f5f5f5; // Jasnoszare tło
  border-radius: 10px; // Zaokrąglone rogi
  padding: 20px; // Dodatkowy padding
  width: 80%; // Szerokość jako procent szerokości ekranu
  max-width: 1000px; // Maksymalna szerokość
  min-width: 300px; // Minimalna szerokość

  & > button {
    width: 200px;
    font-size: ${({ theme }) => theme.fontSize.xl};
    align-self: flex-end; // Przycisk w prawym dolnym rogu
  }

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > li {
      list-style: none;
      margin-top: 3px;
      font-size: ${({ theme }) => theme.fontSize.l};
    }
  }
`;

export const FieldsContainer = styled.div`
display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around; // Równomierne rozmieszczenie elementów
  margin-bottom: 20px;
  width: 100%;
  
@media (max-width: 768px) {
  flex-direction: column;
}
`;
export const Field = styled.div`
  display: flex;
 
  flex: 1 1 calc(50% - 10px);
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.xl};
  gap: 8px;
  margin-bottom: 10px;
  width: 48%; // Szerokość każdego pola
  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
  & > span {
    font-weight: 700;
  }
`;
