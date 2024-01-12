// ProductDetails.styles.ts
import styled from 'styled-components';
import { StyledImage as BaseStyledImage} from '../../components/atoms/Image/Image.styled';
import Button from '../../components/atoms/Button/Button';


export const ClickableField = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-family: Verdana, sans-serif;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 10px;
  cursor: pointer; // Kursor zmienia się na wskaźnik

  &:hover {
    color: ${({ theme }) => theme.colors.babyBlue}; // Kolor tekstu zmienia się na baby blue po najechaniu
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  // inne style
`;
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
export const StyledImage = styled(BaseStyledImage)`
max-width: 300px; // Stała maksymalna szerokość
max-height: 200px; // Stała maksymalna wysokość
width: auto; // Szerokość auto, aby zachować proporcje obrazu
height: auto; // Wysokość auto, aby zachować proporcje obrazu
margin: 5px;
border: 1px solid #ccc;

@media (max-width: ${({ theme }) => theme.breakPoints.m}) {
  max-width: 100%; // Na mniejszych ekranach pełna szerokość
}
`;
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
export const ImageContainer = styled.div`
display: flex;
flex-wrap: wrap; // Umożliwia zawijanie elementów
justify-content: space-between; // Równomierne rozmieszczenie obrazów
align-items: flex-start; // Wyrównanie obrazów do góry
// Dodatkowe style dla kontenera obrazów
`;

export const Field = styled.div`
  font-size: ${({ theme }) => theme.fontSize.l};
  margin-bottom: 10px;
  width: 100%;

  & > span {
    font-weight: 700;
  }
`;
