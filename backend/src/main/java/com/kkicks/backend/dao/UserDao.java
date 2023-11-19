package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User,Long> {
    List<Product> findAllObservedProductsById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
