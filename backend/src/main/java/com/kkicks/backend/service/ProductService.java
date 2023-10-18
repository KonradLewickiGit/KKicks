package com.kkicks.backend.service;

import com.kkicks.backend.dao.CategoryDao;
import com.kkicks.backend.dao.ManufacturerDao;
import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

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

    public Product saveProduct(Product product) {
        return productDao.save(product);
    }
    public Product updateProduct(Long id,Product product){
        Product productToUpdate = productDao.findById(id).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        productToUpdate.setModel(product.getModel());
        productToUpdate.setUser(product.getUser());
        productToUpdate.setManufacturer(product.getManufacturer());
        productToUpdate.setCategory(product.getCategory());
        productToUpdate.setDescription(product.getDescription());
        productToUpdate.setColor(product.getColor());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setIsVerified(product.getIsVerified());
        return productDao.save(productToUpdate);
    }
    public List<Product> findAll(){
        return productDao.findAll();
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
    public List<Product> findAllByCategoryAndManufacturer(Integer idCategory,Integer idManufacturer){
        Category category = categoryDao.findById(idCategory).orElseThrow(() -> new EntityNotFoundException("Category not found"));
        Manufacturer manufacturer = manufacturerDao.findById(idManufacturer).orElseThrow(() -> new EntityNotFoundException("Manufacturer not found"));
        return productDao.findAllByCategoryAndManufacturer(category,manufacturer);
    }
    public void deleteProductById(Long id){
        productDao.deleteById(id);
    }


    public void initTestData(){
        // INIT SAMPLE CATEGORY
        Category mens = new Category();
        mens.setCategoryName("MENS");
        categoryDao.save(mens);
        Category womens = new Category();
        womens.setCategoryName("WOMENS");
        categoryDao.save(womens);

        // INIT SAMPLE MANUFACTURER
        Manufacturer nike = new Manufacturer();
        nike.setManufacturerName("NIKE");
        manufacturerDao.save(nike);
        Manufacturer adidas = new Manufacturer();
        adidas.setManufacturerName("ADIDAS");
        manufacturerDao.save(adidas);

        // INIT ADMIN
        User adminUser = new User();
        adminUser.setFirstName("admin");
        adminUser.setLastName("admin");
        adminUser.setLogin("admin");
        adminUser.setPasswd("admin123!password");
        adminUser.setEmail("konrad.lewicki00@gmail.com");
        adminUser.setRole(Role.ADMIN);
        adminUser.setBrowserMode(BrowserMode.DARK);
        userDao.save(adminUser);

        // INIT TEST USER
        User user1 = new User();
        user1.setFirstName("User1");
        user1.setLastName("User1");
        user1.setLogin("user1");
        user1.setPasswd("user1password");
        user1.setEmail("user1@gmail.com");
        userDao.save(user1);

        // INIT SAMPLE PRODUCTS
        Product p1 = new Product();
        p1.setModel("Test product model");
        p1.setSize(BigDecimal.valueOf(42.5));
        p1.setPrice(BigDecimal.valueOf(499.99));
        p1.setDescription("Test product description");
        p1.setColor("Test product color");
        p1.setCategory(mens);
        p1.setManufacturer(nike);
        p1.setUser(user1);
        productDao.save(p1);

        Product p2 = new Product();
        p2.setModel("Test product model");
        p2.setSize(BigDecimal.valueOf(42.5));
        p2.setPrice(BigDecimal.valueOf(499.99));
        p2.setDescription("Test product description");
        p2.setColor("Test product color");
        p2.setCategory(mens);
        p2.setManufacturer(nike);
        p2.setUser(user1);
        productDao.save(p2);

        Product p3 = new Product();
        p3.setModel("Test product model");
        p3.setSize(BigDecimal.valueOf(42.5));
        p3.setPrice(BigDecimal.valueOf(499.99));
        p3.setDescription("Test product description");
        p3.setColor("Test product color");
        p3.setCategory(womens);
        p3.setManufacturer(adidas);
        p3.setUser(user1);
        productDao.save(p3);

        List<Product> observedProducts = new ArrayList<>();
        observedProducts.add(p2);
        observedProducts.add(p3);
        user1.setObservedProducts(observedProducts);
        userDao.save(user1);
    }
}
