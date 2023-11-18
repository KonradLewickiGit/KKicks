package com.kkicks.backend.service;

import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.dao.UserRatingDao;
import com.kkicks.backend.entity.User;
import com.kkicks.backend.entity.UserRating;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRatingService {
    @Autowired
    UserRatingDao userRatingDao;
    @Autowired
    UserDao userDao;

    public UserRating addRating(Long senderId, Long userId, int stars) {
        User sender = userDao.findById(senderId).orElseThrow(() -> new EntityNotFoundException("Provider not found"));
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        UserRating userRating = userRatingDao.findBySender(sender).orElse(null);
        if(userRating == null){
            userRating = new UserRating();
            userRating.setSender(sender);
            userRating.setUser(user);
            userRating.setStars(stars);
        } else {
            userRating.setStars(stars);
        }

        return userRatingDao.save(userRating);
    }
    public double calculateAverageRating(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<UserRating> ratings = userRatingDao.findAllByUser(user);
        if (ratings.isEmpty()) {
            return 0.0;
        }

        int sum = ratings.stream().mapToInt(UserRating::getStars).sum();
        return (double) sum / ratings.size();
    }
}
