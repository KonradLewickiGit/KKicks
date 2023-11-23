// CategoryList.styles.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 3px auto;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 5px 20px; // Zmniejszony padding z 20px na 10px na górze i na dole
`;

export const CategoryItem = styled.li`
  list-style: none;
  color: ${({ theme }) => theme.colors.darkGrey};
  padding: 10px 20px;
  margin: 10px;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.babyBlue};
  }
`;

export const CategoryListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
`;
