package com.kkicks.backend.service;


import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.ProductImageDao;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.ProductImage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductImageService {
    @Autowired
    ProductImageDao productImageDao;
    @Autowired
    ProductDao productDao;

    private final String imagesPath = "src/main/resources/images/";
    public List<ProductImage> getAllProductImages(Long productId) {
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return productImageDao.findAllByProduct(product);
    }

    public ProductImage getProductImageById(Long id) {
        return productImageDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Image not found"));
    }
    public UrlResource loadImage(String fileName) throws MalformedURLException {
        Path filePath = Path.of(imagesPath + fileName).normalize();
        UrlResource resource = new UrlResource(filePath.toUri());
        return resource;
    }
    public void deleteById(Long id){
        productImageDao.deleteById(id);
    }
}
