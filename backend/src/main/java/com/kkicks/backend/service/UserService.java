package com.kkicks.backend.service;

import com.kkicks.backend.config.security.JWTService;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    UserDao userDao;
    public User createUser(User user){
        return userDao.save(user);
    }
    public List<User> findAll(){
        return userDao.findAll();
    }
    public User findUserById(Long id){
        return userDao.findById(id).orElse(null);
    }
    public List<Product> findAllObservedProductsByUserId(Long id){
        return userDao.findAllObservedProductsById(id);
    }
    public void deleteUserByID(Long id){
        userDao.deleteById(id);
    }

    public User addProductToObserved(Long id, Product product){
        User userToUpdate = userDao.findById(id).orElse(null);
        userToUpdate.addProductToObserved(product);
        return userDao.save(userToUpdate);
    }
    public User deleteProductFromObserved(Long id, Product product){
        User userToUpdate = userDao.findById(id).orElse(null);
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
        return userDao.save(userToUpdate);
    }
    public User findUserByToken(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization").substring(7);
        String login = new JWTService().extractLogin(token);
        System.out.println(login);
        return userDao.findByUsername(login).orElse(null);
    }

}
