import styled from 'styled-components';

export const ChatContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  max-width: 500px; // Możesz dostosować szerokość
`;

export const ChatHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
  margin-bottom: 20px;
`;

export const MessagesContainer = styled.div`
  height: 200px; // Ustaw wysokość kontenera wiadomości
  overflow-y: auto; // Scroll dla długich rozmów
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 10px;
  margin-bottom: 20px;
`;

export const Message = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ChatForm = styled.form`
  display: flex;
  gap: 10px;
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const ChatButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.babyBlue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }
`;
