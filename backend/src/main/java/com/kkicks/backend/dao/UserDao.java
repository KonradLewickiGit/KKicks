package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Product;
import com.kkicks.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserDao extends JpaRepository<User,Long> {
    List<Product> findAllObservedProductsById(Long id);
}
