import styled from 'styled-components'

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px; // Ustawia minimalną wysokość, która jest większa dla obszaru tekstowego
  font-family: 'Veranda', sans-serif;
  padding: 12px 20px; // Ustawienie większego paddingu
  background-color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSize.xl};
  border-radius: 20px;
  border: none;
  resize: vertical; // Pozwala użytkownikowi zmieniać rozmiar tylko w pionie
`;
