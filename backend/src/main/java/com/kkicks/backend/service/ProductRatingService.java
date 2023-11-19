package com.kkicks.backend.service;

import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.ProductRatingDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductRating;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductRatingService {
    @Autowired
    ProductRatingDao productRatingDao;
    @Autowired
    UserDao userDao;
    @Autowired
    ProductDao productDao;

    public ProductRating addRating(Long senderId, Long productId, int stars){
        User sender = userDao.findById(senderId).orElseThrow(() -> new EntityNotFoundException("Sender not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        ProductRating productRating = productRatingDao.findBySenderAndProduct(sender,product).orElse(null);
        if(productRating == null){
            productRating = new ProductRating(null,stars,sender,product);
        } else {
            productRating.setStars(stars);
        }
        return productRatingDao.save(productRating);
    }

    public double calculateAverageRating(Long productId) {
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<ProductRating> ratings = productRatingDao.findAllByProduct(product);
        if (ratings.isEmpty()) {
            return 0.0;
        }

        int sum = ratings.stream().mapToInt(ProductRating::getStars).sum();
        return (double) sum / ratings.size();
    }
}
