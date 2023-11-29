package com.kkicks.backend.service;

import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.dao.UserRatingDao;
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
import static org.mockito.Mockito.*;

class UserRatingServiceTest {

    @Mock
    private UserRatingDao userRatingDao;

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserRatingService userRatingService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testCalculateAverageRating() {
        Long userId = 1L;

        User user = new User();
        user.setId(userId);

        UserRating rating1 = new UserRating();
        rating1.setStars(3);

        UserRating rating2 = new UserRating();
        rating2.setStars(5);

        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(userRatingDao.findAllByUser(user)).thenReturn(List.of(rating1, rating2));

        double averageRating = userRatingService.calculateAverageRating(userId);

        assertEquals(4.0, averageRating, 0.01);
    }
    @Test
    void testCalculateAverageRatingWithoutRatings() {
        Long userId = 1L;

        User user = new User();
        user.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(userRatingDao.findAllByUser(user)).thenReturn(Collections.emptyList());

        double averageRating = userRatingService.calculateAverageRating(userId);

        assertEquals(0.0, averageRating, 0.01);
    }

    @Test
    void testUpdateRating() {
        Long senderId = 1L;
        Long userId = 2L;
        int stars = 4;

        User sender = new User();
        sender.setId(senderId);

        User user = new User();
        user.setId(userId);

        UserRating existingRating = new UserRating();
        existingRating.setSender(sender);
        existingRating.setUser(user);
        existingRating.setStars(3);

        when(userDao.findById(senderId)).thenReturn(Optional.of(sender));
        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(userRatingDao.findBySenderAndUser(sender, user)).thenReturn(Optional.of(existingRating));

        when(userRatingDao.save(any(UserRating.class))).thenReturn(existingRating);

        UserRating result = userRatingService.addRating(senderId, userId, stars);

        assertEquals(stars, existingRating.getStars());

        verify(userRatingDao, times(1)).save(existingRating);

        assertEquals(existingRating, result);
    }
    @Test
    void testAddRating() {
        Long senderId = 1L;
        Long userId = 2L;
        int stars = 4;

        User sender = new User();
        sender.setId(senderId);

        User user = new User();
        user.setId(userId);

        when(userDao.findById(senderId)).thenReturn(Optional.of(sender));
        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(userRatingDao.findBySenderAndUser(sender, user)).thenReturn(Optional.empty());

        when(userRatingDao.save(any(UserRating.class))).thenAnswer(invocation -> {
            UserRating createdRating = invocation.getArgument(0);
            createdRating.setId(1L);
            return createdRating;
        });

        UserRating result = userRatingService.addRating(senderId, userId, stars);

        assertNotNull(result);

        verify(userRatingDao, times(1)).save(any(UserRating.class));

        assertEquals(sender, result.getSender());
        assertEquals(user, result.getUser());
        assertEquals(stars, result.getStars());
    }
}