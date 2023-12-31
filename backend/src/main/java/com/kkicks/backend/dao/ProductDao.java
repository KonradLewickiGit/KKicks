package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Category;
import com.kkicks.backend.entity.Manufacturer;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product,Long> {
    List<Product> findAllByCategory(Category category);
    List<Product> findAllByManufacturer(Manufacturer manufacturer);
    List<Product> findAllByUser(User user);
    List<Product> findAllByCategoryAndManufacturer(Category category, Manufacturer manufacturer);
}
