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
    @PostMapping({"/add"})
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping({"/findAll"})
    public List<User> findAll(){
        return userService.findAll();
    }
    @GetMapping({"/find/{id}"})
    public User findById(@PathVariable Long id){
        return userService.findUserById(id);
    }
    @GetMapping({"/findAllObservedProducts/{id}"})
    public List<Product> findAllObservedProductsByUserId(@PathVariable(value = "id") Long id){
        return userService.findAllObservedProductsByUserId(id);
    }
    @DeleteMapping({"/delete/{id}"})
    public void deleteUserById(@PathVariable Long id){
        userService.deleteUserByID(id);
    }
    @PostMapping({"/addProductToObserved/{id}"})
    public User addProductToObserved(@PathVariable Long id,@RequestBody Product product){
        return userService.addProductToObserved(id,product);
    }
    @DeleteMapping({"/deleteProductFromObserved/{id}"})
    public User deleteProductFromObserved(@PathVariable Long id,@RequestBody Product product){
        return userService.deleteProductFromObserved(id,product);
    }
    @PostMapping({"/update/{id}"})
    public User updateUser(@PathVariable Long id,@RequestBody User updatedUserData){
        return userService.updateUserData(id,updatedUserData);
    }
}
