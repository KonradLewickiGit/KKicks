package com.kkicks.backend.service;

import com.kkicks.backend.dao.*;
import com.kkicks.backend.entity.*;
import com.kkicks.backend.entity.Order.Order;
import com.kkicks.backend.entity.Order.Provider;
import com.kkicks.backend.entity.Order.Status;
import com.kkicks.backend.entity.Payment.PaymentMethod;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.Product.Verification;
import com.kkicks.backend.entity.User.Role;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ProductDao productDao;
    @Autowired
    UserDao userDao;
    @Autowired
    CategoryDao categoryDao;
    @Autowired
    ManufacturerDao manufacturerDao;
    @Autowired
    ProductImageDao productImageDao;

    private  String imagesPath = "src/main/resources/images/";
    public Product saveProduct(Long userId, Integer categoryId, Integer manufacturerId, String model, BigDecimal price, String desc, String color, BigDecimal size, List<MultipartFile> files) throws IOException {
        File directory = new File(imagesPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        Product product = new Product();
        product.setModel(model);
        product.setSize(size);
        product.setColor(color);
        product.setDescription(desc);
        product.setPrice(price);
        product.setManufacturer(manufacturerDao.findById(manufacturerId).orElseThrow(() -> new EntityNotFoundException("manufacturer not found")));
        product.setCategory(categoryDao.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("category not found")));
        product.setUser(userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("user not found")));
        productDao.save(product);
        for (MultipartFile file : files) {
            String fileName = product.getId() + "_" + file.getOriginalFilename();
            Path destPath = Path.of(imagesPath + fileName);
            try {
                ProductImage image = new ProductImage();
                image.setProduct(product);
                image.setPath(fileName);
                Files.copy(file.getInputStream(), destPath, StandardCopyOption.REPLACE_EXISTING);
                productImageDao.save(image);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image " + fileName, e);
            }
        }
        return product;
    }

    public Product updateProduct(Long productId, Integer categoryId, Integer manufacturerId, String model, BigDecimal price, String desc, String color, BigDecimal size, List<MultipartFile> files) throws IOException {
        Product existingProduct = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));

        existingProduct.setModel(model);
        existingProduct.setSize(size);
        existingProduct.setColor(color);
        existingProduct.setDescription(desc);
        existingProduct.setPrice(price);
        existingProduct.setManufacturer(manufacturerDao.findById(manufacturerId).orElseThrow(() -> new EntityNotFoundException("Manufacturer not found")));
        existingProduct.setCategory(categoryDao.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Category not found")));

        Product updatedProduct = productDao.save(existingProduct);

        List<String> newFileNames = files.stream()
                .map(file -> updatedProduct.getId() + "_" + file.getOriginalFilename())
                .collect(Collectors.toList());

        List<ProductImage> oldImages = productImageDao.findAllByProduct(updatedProduct);
        List<String> oldFileNames = oldImages.stream()
                .map(ProductImage::getPath)
                .filter(path -> !newFileNames.contains(path))
                .collect(Collectors.toList());

        for (String oldFileName : oldFileNames) {
            Path oldFilePath = Path.of(imagesPath + oldFileName);
            try {
                Files.deleteIfExists(oldFilePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete old image " + oldFileName, e);
            }
        }

        for (MultipartFile file : files) {
            String fileName = updatedProduct.getId() + "_" + file.getOriginalFilename();
            Path destPath = Path.of(imagesPath + fileName);
            try {
                ProductImage image = new ProductImage();
                image.setProduct(updatedProduct);
                image.setPath(fileName);
                Files.copy(file.getInputStream(), destPath, StandardCopyOption.REPLACE_EXISTING);
                productImageDao.save(image);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image " + fileName, e);
            }
        }

        return updatedProduct;
    }
    public List<Product> findAll(){
        return productDao.findAll();
    }

    public Product find(Long id){
        return productDao.findById(id).orElseThrow(() -> new EntityNotFoundException("product not found"));
    }
    public ArrayList<Product> addProducts(ArrayList<Product> products) {
        return (ArrayList<Product>) productDao.saveAll(products);
    }
    public List<Product> findAllByCategory(Integer id){
        Category category = categoryDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found"));
        return productDao.findAllByCategory(category);
    }
    public List<Product> findAllByManufacturer(Integer id){
        Manufacturer manufacturer = manufacturerDao.findById(id).orElse(null);
        return productDao.findAllByManufacturer(manufacturer);
    }
    public List<Product> findAllByUser(Long id){
        User user = userDao.findById(id).orElse(null);
        return productDao.findAllByUser(user);
    }
    public User findUserByPostedProductId(Long productId){
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return product.getUser();
    }

    public List<Product> findAllByCategoryAndManufacturer(Integer idCategory,Integer idManufacturer){
        Category category = categoryDao.findById(idCategory).orElseThrow(() -> new EntityNotFoundException("Category not found"));
        Manufacturer manufacturer = manufacturerDao.findById(idManufacturer).orElseThrow(() -> new EntityNotFoundException("Manufacturer not found"));
        return productDao.findAllByCategoryAndManufacturer(category,manufacturer);
    }
    public void deleteProductById(Long id){
        Product product = productDao.findById(id).orElseThrow(() -> new EntityNotFoundException("product not found"));
        List<ProductImage> images = productImageDao.findAllByProduct(product);
        product.setProductImage(null);
        productImageDao.deleteAll(images);
        productDao.deleteById(id);
    }
    public Product setVerification(Long id){
        Product product = productDao.findById(id).orElseThrow(() -> new EntityNotFoundException("product not found"));
        product.setIsVerified(Verification.VERIFIED);
        return productDao.save(product);
    }
}
