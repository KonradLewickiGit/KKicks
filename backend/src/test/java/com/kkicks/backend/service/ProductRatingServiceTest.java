package com.kkicks.backend.service;

import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.ProductRatingDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.dao.UserRatingDao;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductRating;
import com.kkicks.backend.entity.User.User;
import com.kkicks.backend.entity.UserRating;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProductRatingServiceTest {
    @Mock
    private ProductRatingDao productRatingDao;

    @Mock
    private ProductDao productDao;

    @Mock
    private UserDao userDao;

    @InjectMocks
    private ProductRatingService productRatingService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddRating() {
        Long senderId = 1L;
        Long productId = 1L;
        int stars = 4;

        User sender = new User();
        sender.setId(senderId);

        Product product = new Product();
        product.setId(productId);

        when(userDao.findById(senderId)).thenReturn(Optional.of(sender));
        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(productRatingDao.findBySenderAndProduct(sender, product)).thenReturn(Optional.empty());

        when(productRatingDao.save(any(ProductRating.class))).thenAnswer(invocation -> {
            ProductRating createdRating = invocation.getArgument(0);
            createdRating.setId(1L);
            return createdRating;
        });

        ProductRating result = productRatingService.addRating(senderId, productId, stars);

        assertNotNull(result);

        verify(productRatingDao, times(1)).save(any(ProductRating.class));

        assertEquals(sender, result.getSender());
        assertEquals(product, result.getProduct());
        assertEquals(stars, result.getStars());
    }
    @Test
    void testUpdateRating() {
        Long senderId = 1L;
        Long productId = 1L;
        int stars = 4;

        User sender = new User();
        sender.setId(senderId);

        Product product = new Product();
        product.setId(productId);

        ProductRating existingRating = new ProductRating();
        existingRating.setSender(sender);
        existingRating.setProduct(product);
        existingRating.setStars(3);

        when(userDao.findById(senderId)).thenReturn(Optional.of(sender));
        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(productRatingDao.findBySenderAndProduct(sender, product)).thenReturn(Optional.of(existingRating));

        when(productRatingDao.save(any(ProductRating.class))).thenReturn(existingRating);

        ProductRating result = productRatingService.addRating(senderId, productId, stars);

        assertEquals(stars, existingRating.getStars());

        verify(productRatingDao, times(1)).save(existingRating);

        assertEquals(existingRating, result);
    }

    @Test
    void testCalculateAverageRating() {
        Long productId = 1L;

        Product product = new Product();
        product.setId(productId);

        ProductRating rating1 = new ProductRating();
        rating1.setStars(3);

        ProductRating rating2 = new ProductRating();
        rating2.setStars(5);

        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(productRatingDao.findAllByProduct(product)).thenReturn(List.of(rating1, rating2));

        double averageRating = productRatingService.calculateAverageRating(productId);

        assertEquals(4.0, averageRating, 0.01);
    }
    @Test
    void testCalculateAverageRatingWithoutRatings() {
        Long productId = 1L;

        Product product = new Product();
        product.setId(productId);

        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(productRatingDao.findAllByProduct(product)).thenReturn(Collections.emptyList());

        double averageRating = productRatingService.calculateAverageRating(productId);

        assertEquals(0.0, averageRating, 0.01);
    }
}