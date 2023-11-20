package com.kkicks.backend.service;

import com.kkicks.backend.config.security.JWTService;
import com.kkicks.backend.dao.*;
import com.kkicks.backend.entity.Address;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductRating;
import com.kkicks.backend.entity.User.Role;
import com.kkicks.backend.entity.User.User;
import com.kkicks.backend.entity.UserRating;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    UserDao userDao;
    @Autowired
    ProductDao productDao;
    @Autowired
    ProductRatingDao productRatingDao;
    @Autowired
    UserRatingDao userRatingDao;
    @Autowired
    AddressDao addressDao;
    public User createAdministrator(Long userId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("user not found"));
        user.setRole(Role.ADMIN);
        return userDao.save(user);
    }
    public List<User> findAll(){
        return userDao.findAll();
    }
    public User findUserById(Long id){
        return userDao.findById(id).orElse(null);
    }
    public void deleteUserByID(Long userId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("user not found"));
        user.setNonExpired(false);
        userDao.save(user);
    }

    public User addProductToObserved(Long id, Long productId){
        User userToUpdate = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        userToUpdate.addProductToObserved(product);
        return userDao.save(userToUpdate);
    }
    public User deleteProductFromObserved(Long id, Long productId){
        User userToUpdate = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        userToUpdate.deleteProductFromObserved(product);
        return userDao.save(userToUpdate);
    }

    public User updateUserData(Long id,User user){
        User userToUpdate = userDao.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userToUpdate.setEmail(userToUpdate.getEmail());
        userToUpdate.setUsername(userToUpdate.getUsername());
        userToUpdate.setPassword(userToUpdate.getPassword());
        userToUpdate.setPhoneNumber(user.getPhoneNumber());
        userToUpdate.setAddress(user.getAddress());
        Address address = user.getAddress();
        address.setUser(userToUpdate);
        addressDao.save(address);
        return userDao.saveAndFlush(userToUpdate);
    }
    public User findUserByToken(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization").substring(7);
        String login = new JWTService().extractLogin(token);
        System.out.println(login);
        return userDao.findByEmail(login).orElse(null);
    }

}
