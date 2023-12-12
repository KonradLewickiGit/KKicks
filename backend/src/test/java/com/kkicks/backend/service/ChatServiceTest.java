package com.kkicks.backend.service;

import com.kkicks.backend.dao.ChatDao;
import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.entity.Chat.Chat;
import com.kkicks.backend.entity.Product.Product;
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
    @Mock
    private ProductDao productDao;

    // Initialize mocks
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetChatByProductId_Exists() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        product.setId(productId);
        Chat expectedChat = new Chat(null,product);
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(product));
        when(chatDao.findChatByProduct(eq(product))).thenReturn(Optional.of(expectedChat));

        // Act
        Chat actualChat = chatService.getChatByProductId(productId);

        // Assert
        assertNotNull(actualChat);
        assertEquals(expectedChat, actualChat);
        verify(chatDao, times(1)).findChatByProduct(eq(product));
    }

    @Test
    void testGetChatByProductId_NotExists() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        product.setId(productId);
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(product));
        when(chatDao.findChatByProduct(eq(product))).thenReturn(Optional.empty());

        // Act and Assert
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () ->
                chatService.getChatByProductId(productId));

        assertEquals("chat not found", exception.getMessage());
        verify(chatDao, times(1)).findChatByProduct(eq(product));
    }

}