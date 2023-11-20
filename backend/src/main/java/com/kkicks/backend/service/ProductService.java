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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {
    @Autowired
    ProductDao productDao;
    @Autowired
    UserDao userDao;
    @Autowired
    CategoryDao categoryDao;
    @Autowired
    ManufacturerDao manufacturerDao;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    AddressDao addressDao;
    @Autowired
    ProductImageDao productImageDao;
    @Autowired
    OrderService orderService;
    @Autowired
    UserRatingService userRatingService;
    @Autowired
    ProductRatingService productRatingService;
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

        User user = new User();
        user.setFirstName("test");
        user.setLastName("test");
        user.setEmail("test");
        user.setUsername("test");
        user.setPassword(passwordEncoder.encode("test"));
        user.setPhoneNumber("test");
        user.setRole(Role.ADMIN);
        userDao.save(user);

        User user1 = new User();
        user1.setFirstName("test1");
        user1.setLastName("test1");
        user1.setEmail("test1");
        user1.setUsername("test1");
        user1.setPassword(passwordEncoder.encode("test1"));
        user1.setPhoneNumber("test1");
        userDao.save(user1);

        Address address = new Address(null,"Lublin","20-400","Zarnowiecka","8",8,user);
        addressDao.save(address);
        Address address1 = new Address(null,"Zbuczyn","08-106","Jasna","46",1,user1);
        addressDao.save(address1);


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

        List<ProductImage> productImages = new ArrayList<>();
        ProductImage productImage1 = new ProductImage(null,"image1",p1);
        ProductImage productImage2 = new ProductImage(null,"image2",p1);
        ProductImage productImage3 = new ProductImage(null,"image3",p2);
        ProductImage productImage4 = new ProductImage(null,"image4",p2);
        ProductImage productImage5 = new ProductImage(null,"image5",p3);
        ProductImage productImage6 = new ProductImage(null,"image6",p3);
        productImages.add(productImage1);
        productImages.add(productImage2);
        productImages.add(productImage3);
        productImages.add(productImage4);
        productImages.add(productImage5);
        productImages.add(productImage6);
        productImageDao.saveAll(productImages);

        UserRating userRating = new UserRating(null,5,user,user1);
        UserRating userRating1 = new UserRating(null,1,user1,user1);
        UserRating userRating2 = new UserRating(null,5,user,user);
        UserRating userRating3 = new UserRating(null,4,user1,user);
        userRatingService.addRating(userRating.getSender().getId(),userRating.getUser().getId(),userRating.getStars());
        userRatingService.addRating(userRating1.getSender().getId(),userRating1.getUser().getId(),userRating1.getStars());
        userRatingService.addRating(userRating2.getSender().getId(),userRating2.getUser().getId(),userRating2.getStars());
        userRatingService.addRating(userRating3.getSender().getId(),userRating3.getUser().getId(),userRating3.getStars());

        ProductRating productRating = new ProductRating(null,5,user,p1);
        ProductRating productRating1 = new ProductRating(null,1,user1,p1);
        ProductRating productRating2 = new ProductRating(null,5,user,p2);
        ProductRating productRating3 = new ProductRating(null,5,user1,p2);
        ProductRating productRating4 = new ProductRating(null,5,user,p3);
        ProductRating productRating5 = new ProductRating(null,3,user1,p3);
        productRatingService.addRating(productRating.getSender().getId(),productRating.getProduct().getId(),productRating.getStars());
        productRatingService.addRating(productRating1.getSender().getId(),productRating1.getProduct().getId(),productRating1.getStars());
        productRatingService.addRating(productRating2.getSender().getId(),productRating2.getProduct().getId(),productRating2.getStars());
        productRatingService.addRating(productRating3.getSender().getId(),productRating3.getProduct().getId(),productRating3.getStars());
        productRatingService.addRating(productRating4.getSender().getId(),productRating4.getProduct().getId(),productRating4.getStars());
        productRatingService.addRating(productRating5.getSender().getId(),productRating5.getProduct().getId(),productRating5.getStars());

        System.out.println("p1: " + productRatingService.calculateAverageRating(1L));
        System.out.println("p2: " + productRatingService.calculateAverageRating(2L));
        System.out.println("p3: " + productRatingService.calculateAverageRating(3L));

        Order order = new Order(null,BigDecimal.valueOf(111.11), Provider.INPOST, Status.CREATED, new Date(), p1, user, null);
        Order order2 = new Order(null,BigDecimal.valueOf(222.22), Provider.DHL, Status.CREATED, new Date(), p2, user, null);

        orderService.createOrder(order.getUser().getId(),order.getProduct().getId(),order.getProvider());
        orderService.createOrder(order2.getUser().getId(),order2.getProduct().getId(),order2.getProvider());

        orderService.processPayment(1L, PaymentMethod.VISA);
        orderService.processPayment(2L, PaymentMethod.BLIK);

    }
}
