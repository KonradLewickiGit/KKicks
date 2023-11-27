import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5; // Możesz dostosować kolor tła
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

export const Label = styled.label`
  margin: 10px;
  font-size: 16px;
  color: #333; // Możesz dostosować kolor tekstu
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const TotalPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #555; // Możesz dostosować kolor tekstu
`;
