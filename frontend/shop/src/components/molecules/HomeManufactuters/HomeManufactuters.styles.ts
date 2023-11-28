import styled from 'styled-components';

export const ManufacturerProductsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  list-style: none;
  font-family: 'Verdana', sans-serif;
`;

export const ManufacturerProductItem = styled.li`
  flex: 0 0 calc(33.333% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakPoints.m}) {
    flex: 0 0 calc(50% - 20px); // Na mniejszych ekranach 2 w wierszu
  }
`;
