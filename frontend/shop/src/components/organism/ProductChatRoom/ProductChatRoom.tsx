import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ChatContainer, ChatHeader, MessagesContainer, Message, ChatForm, ChatInput, ChatButton } from './ProductChatRoom.styles';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useApi'; // Zaimportuj useAuth z Twojego projektu

interface Message {
  content: string;
  sender: string;
  status: string;
}

const ProductChatRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [chat, setChat] = useState<any>(null);
  const { user } = useAuth(); // Użyj hooka useAuth do pobrania danych użytkownika

  useEffect(() => {
    fetch(`http://localhost:8080/getChatByProductId/${id}`)
      .then(response => response.json())
      .then(data => setChat(data))
      .catch(error => console.error('Error fetching chat data:', error));
  }, [id]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stomp = Stomp.over(socket);
    stomp.connect({}, () => {
      console.log('Connected to WebSocket');
      setStompClient(stomp);
    });

    return () => {
        if (stompClient) {
          stompClient.disconnect(() => {
            console.log('Disconnected from WebSocket');
          });
        }
      };
    }, [stompClient]);

  useEffect(() => {
    if (stompClient) {
      const chatRoomTopic = `/topic/product/${id}/chatRoom`;
      const subscription = stompClient.subscribe(chatRoomTopic, message => {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, id]);

  const sendMessage = (content: string) => {
    if (stompClient && user) {
      const message = {
        content,
        sender: user.username, // Użyj nazwy użytkownika z danych autentykacji
        status: "MESSAGE"
      };
      stompClient.send(`/app/product/${id}/sendMessage`, {}, JSON.stringify(message));
    }
  };

  const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const messageContent = formData.get('message') as string;
    sendMessage(messageContent);
    event.currentTarget.reset();
  };

  return (
    <ChatContainer>
    <ChatHeader>Czat produktu</ChatHeader>
    <MessagesContainer>
      {messages.map((msg, index) => (
        <Message key={index}>{msg.content} - {msg.sender}</Message>
      ))}
    </MessagesContainer>
    <ChatForm onSubmit={handleMessageSubmit}>
      <ChatInput type="text" name="message" />
      <ChatButton type="submit">Send</ChatButton>
    </ChatForm>
  </ChatContainer>
  );
};

export default ProductChatRoom;