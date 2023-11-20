package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductRating;
import com.kkicks.backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRatingDao extends JpaRepository<ProductRating,Long> {
    List<ProductRating> findAllByProduct(Product product);
    List<ProductRating> findAllBySender(User user);
    Optional<ProductRating> findBySenderAndProduct(User user, Product product);
}
