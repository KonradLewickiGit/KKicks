package com.kkicks.backend.controler;

import com.kkicks.backend.entity.UserRating;
import com.kkicks.backend.service.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userRating")
public class UserRatingController {
    @Autowired
    UserRatingService userRatingService;
    @PostMapping("/add/{senderId}/{userId}")
    private UserRating addUserRating(@PathVariable Long senderId, @PathVariable Long userId, @RequestBody Integer stars){
        return userRatingService.addRating(senderId, userId, stars);
    }
    @GetMapping("/average/{userId}")
    private double countAverageUserRating(@PathVariable Long userId){
        return userRatingService.calculateAverageRating(userId);
    }
}
