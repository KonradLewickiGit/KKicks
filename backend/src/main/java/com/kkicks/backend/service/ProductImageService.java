package com.kkicks.backend.service;


import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.ProductImageDao;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductImage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductImageService {
    @Autowired
    ProductImageDao productImageDao;
    @Autowired
    ProductDao productDao;

    public ProductImage addImage(Long productId, String path){
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return productImageDao.save(new ProductImage(null,path,product));
    }

    public List<ProductImage> addImages(Long productId, List<String> paths){
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        List<ProductImage> images = new ArrayList<>();
        for (String path : paths){
            images.add(new ProductImage(null,path,product));
        }
        return productImageDao.saveAll(images);
    }

    public List<ProductImage> getAllProductImages(Long productId) {
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return productImageDao.findAllByProduct(product);
    }

    public ProductImage getProductImageById(Long id) {
        return productImageDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Image not found"));
    }

    public void deleteById(Long id){
        productImageDao.deleteById(id);
    }
}
