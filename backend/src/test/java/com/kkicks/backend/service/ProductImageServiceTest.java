package com.kkicks.backend.service;

import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.ProductImageDao;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductImage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class ProductImageServiceTest {
    @InjectMocks
    private ProductImageService productImageService;

    @Mock
    private ProductImageDao productImageDao;

    @Mock
    private ProductDao productDao;

    // Initialize mocks
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProductImages() {
        // Arrange
        Long productId = 1L;
        Product product = new Product();
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(product));

        List<ProductImage> expectedImages = new ArrayList<>();
        when(productImageDao.findAllByProduct(eq(product))).thenReturn(expectedImages);

        // Act
        List<ProductImage> actualImages = productImageService.getAllProductImages(productId);

        // Assert
        assertEquals(expectedImages, actualImages);
        verify(productDao, times(1)).findById(eq(productId));
        verify(productImageDao, times(1)).findAllByProduct(eq(product));
    }

    @Test
    void testGetProductImageById() {
        // Arrange
        Long imageId = 1L;
        ProductImage expectedImage = new ProductImage();
        when(productImageDao.findById(eq(imageId))).thenReturn(Optional.of(expectedImage));

        // Act
        ProductImage actualImage = productImageService.getProductImageById(imageId);

        // Assert
        assertEquals(expectedImage, actualImage);
        verify(productImageDao, times(1)).findById(eq(imageId));
    }

    @Test
    void testLoadImage() throws IOException {
        // Arrange
        String fileName = "test-image.jpg";

        // Act
        UrlResource resource = productImageService.loadImage(fileName);

        // Assert
        assertNotNull(resource);
        assertEquals(Path.of("src/main/resources/images/").toUri().normalize().toString() + fileName, resource.getURI().normalize().toString());
    }

    @Test
    void testDeleteById() {
        // Arrange
        Long imageId = 1L;

        // Act
        productImageService.deleteById(imageId);

        // Assert
        verify(productImageDao, times(1)).deleteById(eq(imageId));
    }

}