import styled from 'styled-components';

export const ManufacturerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
`;

export const ManufacturerItem = styled.div`
  font-family: 'Verdana', sans-serif;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.midGrey};
  margin-bottom: 20px;
  padding: 10px; // Dodano padding dla lepszego efektu wizualnego
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #89CFF0; // Baby blue kolor tła
    color: ${({ theme }) => theme.colors.white}; // Opcjonalnie, zmiana koloru tekstu
  }
`;
