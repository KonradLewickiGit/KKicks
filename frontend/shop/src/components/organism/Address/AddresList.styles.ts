import styled from 'styled-components';
export const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; // Pełna szerokość kontenera
`;

export const Field = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.xl};
  gap: 8px;
  margin-bottom: 10px;
  width: 48%; // Szerokość każdego pola

  & > span {
    font-weight: 700;
  }
`;
