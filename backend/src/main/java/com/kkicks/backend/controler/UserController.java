package com.kkicks.backend.controler;

import com.kkicks.backend.entity.Product;
import com.kkicks.backend.entity.User;
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
    private User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping({"/findAll"})
    private List<User> findAll(){
        return userService.findAll();
    }
    @GetMapping({"/find/{id}"})
    private User findById(@PathVariable Long id){
        return userService.findUserById(id);
    }
    @GetMapping({"/findAllObservedProducts/{id}"})
    private List<Product> findAllObservedProductsByUserId(@PathVariable(value = "id") Long id){
        return userService.findAllObservedProductsByUserId(id);
    }
    @DeleteMapping({"/delete/{id}"})
    private void deleteUserById(@PathVariable Long id){
        userService.deleteUserByID(id);
    }
    @PostMapping({"/addProductToObserved/{id}"})
    private User addProductToObserved(@PathVariable Long id,@RequestBody Product product){
        return userService.addProductToObserved(id,product);
    }
    @DeleteMapping({"/deleteProductFromObserved/{id}"})
    private User deleteProductFromObserved(@PathVariable Long id,@RequestBody Product product){
        return userService.deleteProductFromObserved(id,product);
    }
    @PostMapping({"/update/{id}"})
    private User updateUser(@PathVariable Long id,@RequestBody User updatedUserData){
        return userService.updateUserData(id,updatedUserData);
    }
}
