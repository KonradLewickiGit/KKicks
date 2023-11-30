package com.kkicks.backend.service;

import com.kkicks.backend.dao.ChatDao;
import com.kkicks.backend.entity.Chat.Chat;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class ChatServiceTest {
    @InjectMocks
    private ChatService chatService;

    @Mock
    private ChatDao chatDao;

    // Initialize mocks
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetChatByProductId_Exists() {
        // Arrange
        Long productId = 1L;
        Chat expectedChat = new Chat();
        when(chatDao.findByProductId(eq(productId))).thenReturn(Optional.of(expectedChat));

        // Act
        Chat actualChat = chatService.getChatByProductId(productId);

        // Assert
        assertNotNull(actualChat);
        assertEquals(expectedChat, actualChat);
        verify(chatDao, times(1)).findByProductId(eq(productId));
    }

    @Test
    void testGetChatByProductId_NotExists() {
        // Arrange
        Long productId = 1L;
        when(chatDao.findByProductId(eq(productId))).thenReturn(Optional.empty());

        // Act and Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () ->
                chatService.getChatByProductId(productId));

        assertEquals("Chat not found", exception.getMessage());
        verify(chatDao, times(1)).findByProductId(eq(productId));
    }

}