package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageDao extends JpaRepository<ProductImage, Long> {
    public List<ProductImage> findAllByProduct(Product product);
}
