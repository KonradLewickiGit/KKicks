import styled from "styled-components";
import Button from "../../components/atoms/Button/Button";
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  font-family: 'Verdana', sans-serif;
  max-width: 500px;
  margin: 20px auto; // Dodanie 20px marginesu na górze i na dole
  padding: 20px; // Opcjonalnie dostosuj odstęp wewnętrzny
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
export const StyledFileInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white; // Ustawienie białego tła
  // Dodaj tutaj własne style dla inputu plików
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white; // Ustawienie białego tła
  // Dodaj tutaj własne style dla inputu
`;
export const StyledButton = styled(Button)`
  max-width: 200px; // Maksymalna szerokość przycisku
  margin-top: 10px; // Margines górny, aby przesunąć przycisk wyżej
  width: 100%; // Szerokość przycisku (możesz dostosować lub usunąć, jeśli chcesz użyć max-width)
  // Dodatkowe style, jeśli są potrzebne
`;
export const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white; // Ustawienie białego tła
  font-size: ${({ theme }) => theme.fontSize.m}; // Dostosowanie rozmiaru czcionki
  color: ${({ theme }) => theme.colors.text}; // Kolor tekstu
  width: 100%; // Szerokość na 100% kontenera

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}; // Zmiana koloru obramowania przy najechaniu
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary}; // Zmiana koloru obramowania przy fokusie
    box-shadow: 0 0 3px ${({ theme }) => theme.colors.primary}; // Dodanie cienia wokół elementu
  }
`;