package com.kkicks.backend.service;

import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public class UserService {
    @Autowired
    private UserDao userDao;
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
        User user = userDao.findById(id).orElse(null);
        return user.getObservedProducts();
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
        userToUpdate.setLogin(userToUpdate.getLogin());
        userToUpdate.setPassword(userToUpdate.getPassword());
        userToUpdate.setPhoneNumber(user.getPhoneNumber());
        userToUpdate.setAddress(user.getAddress());
        return userDao.save(userToUpdate);
    }


}
