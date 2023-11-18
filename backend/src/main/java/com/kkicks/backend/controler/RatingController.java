package com.kkicks.backend.controler;

import com.kkicks.backend.entity.ProductRating;
import com.kkicks.backend.entity.UserRating;
import com.kkicks.backend.service.ProductRatingService;
import com.kkicks.backend.service.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rating")
public class RatingController {
    @Autowired
    UserRatingService userRatingService;
    @Autowired
    ProductRatingService productRatingService;
    @PostMapping("/addUserRating/{senderId}/{userId}")
    private UserRating addUserRating(@PathVariable Long senderId, @PathVariable Long userId, @RequestBody Integer stars){
        return userRatingService.addRating(senderId, userId, stars);
    }
    @GetMapping("/averageUserRating/{userId}")
    private double countAverageUserRating(@PathVariable Long userId){
        return userRatingService.calculateAverageRating(userId);
    }

    @PostMapping("/addProductRating/{senderId}/{productId}")
    private ProductRating addProductRating(@PathVariable Long senderId, @PathVariable Long productId, @RequestBody Integer stars){
        return productRatingService.addRating(senderId, productId, stars);
    }
    @GetMapping("/averageProductRating/{productId}")
    private double countAverageProductRating(@PathVariable Long productId){
        return productRatingService.calculateAverageRating(productId);
    }
}
