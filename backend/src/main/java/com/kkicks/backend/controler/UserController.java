package com.kkicks.backend.controler;

import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import com.kkicks.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping({"/user"})
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping("/find")
    public User findUser(HttpServletRequest httpServletRequest){
        return userService.findUserByToken(httpServletRequest);
    }
    @PostMapping({"/giveAdminRole/{userId}"})
    public User giveAdminRole(@PathVariable Long userId){
        return userService.createAdministrator(userId);
    }

    @GetMapping({"/find/All"})
    public List<User> findAll(){
        return userService.findAll();
    }
    @GetMapping({"/find/{id}"})
    public User findById(@PathVariable Long id){
        return userService.findUserById(id);
    }
    @DeleteMapping({"/delete/{id}"})
    public void deleteUserById(@PathVariable Long id){
        userService.deleteUserByID(id);
    }
    @PostMapping({"/addProductToObserved/{id}/{productId}"})
    public User addProductToObserved(@PathVariable Long id,@PathVariable Long productId){
        return userService.addProductToObserved(id,productId);
    }
    @DeleteMapping({"/deleteProductFromObserved/{id}/{productId}"})
    public User deleteProductFromObserved(@PathVariable Long id,@PathVariable Long productId){
        return userService.deleteProductFromObserved(id,productId);
    }
    @GetMapping({"/find/AllObservedProducts/{userId}"})
    public List<Product> findAllObservedProducts(@PathVariable Long userId){
        return userService.findAllObservedProductsByUserId(userId);
    }
    @PostMapping({"/update/{id}"})
    public User updateUser(@PathVariable Long id,@RequestBody User updatedUserData){
        return userService.updateUserData(id,updatedUserData);
    }
}
