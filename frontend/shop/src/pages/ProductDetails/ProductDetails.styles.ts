// ProductDetails.styles.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 80%;
  max-width: 1000px;
  min-width: 300px;
  margin: 40px auto;
  border-radius: 10px;

  & > button {
    width: 200px;
    font-size: ${({ theme }) => theme.fontSize.xl};
    align-self: flex-end; // Przycisk w prawym dolnym rogu
  }
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
