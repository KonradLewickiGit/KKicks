package com.kkicks.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.kkicks.backend.dao.*;
import com.kkicks.backend.entity.Category;
import com.kkicks.backend.entity.Manufacturer;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.Product.Verification;
import com.kkicks.backend.entity.ProductImage;
import com.kkicks.backend.entity.User.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class ProductServiceTest {
    @Mock
    private ManufacturerDao manufacturerDao;

    @Mock
    private CategoryDao categoryDao;

    @Mock
    private UserDao userDao;

    @Mock
    private ProductDao productDao;

    @Mock
    private ProductImageDao productImageDao;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveProduct() throws IOException {
        Long userId = 1L;
        Integer categoryId = 1;
        Integer manufacturerId = 1;
        String model = "Test Model";
        BigDecimal price = BigDecimal.valueOf(100.00);
        String desc = "Test Description";
        String color = "Red";
        BigDecimal size = BigDecimal.valueOf(10.0);
        List<MultipartFile> files = new ArrayList<>();
        MockMultipartFile file1 = new MockMultipartFile(
                "file1",           // parameter name
                "test-file1.txt",  // original file name
                "text/plain",      // content type
                "Hello, World!".getBytes(StandardCharsets.UTF_8) // file content
        );

        MockMultipartFile file2 = new MockMultipartFile(
                "file2",
                "test-file2.txt",
                "text/plain",
                "Mock file content".getBytes(StandardCharsets.UTF_8)
        );

        files.add(file1);
        files.add(file2);

        when(manufacturerDao.findById(manufacturerId)).thenReturn(Optional.of(new Manufacturer(1,"test")));
        when(categoryDao.findById(categoryId)).thenReturn(Optional.of(new Category(1,"test")));
        when(userDao.findById(userId)).thenReturn(Optional.of(new User()));
        when(productDao.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(productImageDao.save(any())).thenAnswer(invocation -> invocation.getArgument(0));


        Product result = productService.saveProduct(userId, categoryId, manufacturerId, model, price, desc, color, size, files);

        assertNotNull(result);
        assertEquals(categoryId,result.getCategory().getId());
        assertEquals(manufacturerId,result.getManufacturer().getId());
        assertEquals(model,result.getModel());
        assertEquals(desc,result.getDescription());
        assertEquals(price,result.getPrice());
        assertEquals(color,result.getColor());
        assertEquals(size,result.getSize());

        verify(manufacturerDao, times(1)).findById(manufacturerId);
        verify(categoryDao, times(1)).findById(categoryId);
        verify(userDao, times(1)).findById(userId);
        verify(productDao, times(1)).save(any(Product.class));
        verify(productImageDao, times(files.size())).save(any(ProductImage.class));
    }

    @Test
    public void testProductUpdate() throws IOException {
        Long productId = 1L;
        Integer categoryId = 1;
        Integer manufacturerId = 1;
        String model = "Updated Model";
        BigDecimal price = BigDecimal.valueOf(150.00);
        String desc = "Updated Description";
        String color = "Blue";
        BigDecimal size = BigDecimal.valueOf(15.0);
        List<MultipartFile> files = new ArrayList<>();
        MockMultipartFile file1 = new MockMultipartFile(
                "file1",           // parameter name
                "test-file1.txt",  // original file name
                "text/plain",      // content type
                "Hello, World!".getBytes(StandardCharsets.UTF_8) // file content
        );

        MockMultipartFile file2 = new MockMultipartFile(
                "file2",
                "test-file2.txt",
                "text/plain",
                "Mock file content".getBytes(StandardCharsets.UTF_8)
        );

        files.add(file1);
        files.add(file2);

        Product existingProduct = new Product();
        existingProduct.setId(productId);

        when(productDao.findById(eq(productId))).thenReturn(Optional.of(existingProduct));
        when(manufacturerDao.findById(eq(manufacturerId))).thenReturn(Optional.of(new Manufacturer()));
        when(categoryDao.findById(eq(categoryId))).thenReturn(Optional.of(new Category()));
        when(productDao.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        Product updatedProduct = productService.updateProduct(productId, categoryId, manufacturerId, model, price, desc, color, size, files);

        assertNotNull(updatedProduct);
        assertEquals(model, updatedProduct.getModel());
        assertEquals(price, updatedProduct.getPrice());
        assertEquals(desc, updatedProduct.getDescription());
        assertEquals(color, updatedProduct.getColor());
        assertEquals(size, updatedProduct.getSize());

        verify(productDao, times(1)).findById(eq(productId));
        verify(manufacturerDao, times(1)).findById(eq(manufacturerId));
        verify(categoryDao, times(1)).findById(eq(categoryId));
        verify(productDao, times(1)).save(any(Product.class));
        verify(productImageDao, times(files.size())).save(any(ProductImage.class));
    }
    @Test
    void testFindAll() {
        // Arrange
        List<Product> expectedProducts = new ArrayList<>();
        when(productDao.findAll()).thenReturn(expectedProducts);

        // Act
        List<Product> actualProducts = productService.findAll();

        // Assert
        assertEquals(expectedProducts, actualProducts);
        verify(productDao, times(1)).findAll();
    }

    @Test
    void testFind() {
        // Arrange
        Long productId = 1L;
        Product expectedProduct = new Product();
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(expectedProduct));

        // Act
        Product actualProduct = productService.find(productId);

        // Assert
        assertEquals(expectedProduct, actualProduct);
        verify(productDao, times(1)).findById(eq(productId));
    }

    @Test
    void testFindAllByCategory() {
        // Arrange
        Integer categoryId = 1;
        Category category = new Category();
        when(categoryDao.findById(eq(categoryId))).thenReturn(Optional.of(category));
        when(productDao.findAllByCategory(eq(category))).thenReturn(new ArrayList<>());

        // Act
        List<Product> products = productService.findAllByCategory(categoryId);

        // Assert
        assertNotNull(products);
        verify(categoryDao, times(1)).findById(eq(categoryId));
        verify(productDao, times(1)).findAllByCategory(eq(category));
    }

    @Test
    void testFindAllByManufacturer() {
        // Arrange
        Integer manufacturerId = 1;
        Manufacturer manufacturer = new Manufacturer();
        when(manufacturerDao.findById(eq(manufacturerId))).thenReturn(Optional.of(manufacturer));
        when(productDao.findAllByManufacturer(eq(manufacturer))).thenReturn(new ArrayList<>());

        // Act
        List<Product> products = productService.findAllByManufacturer(manufacturerId);

        // Assert
        assertNotNull(products);
        verify(manufacturerDao, times(1)).findById(eq(manufacturerId));
        verify(productDao, times(1)).findAllByManufacturer(eq(manufacturer));
    }

    @Test
    void testFindAllByUser() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        when(userDao.findById(eq(userId))).thenReturn(Optional.of(user));
        when(productDao.findAllByUser(eq(user))).thenReturn(new ArrayList<>());

        // Act
        List<Product> products = productService.findAllByUser(userId);

        // Assert
        assertNotNull(products);
        verify(userDao, times(1)).findById(eq(userId));
        verify(productDao, times(1)).findAllByUser(eq(user));
    }

    @Test
    void testFindUserByPostedProductId() {
        // Arrange
        Long productId = 1L;
        User expectedUser = new User();
        Product product = new Product();
        product.setUser(expectedUser);
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(product));

        // Act
        User actualUser = productService.findUserByPostedProductId(productId);

        // Assert
        assertEquals(expectedUser, actualUser);
        verify(productDao, times(1)).findById(eq(productId));
    }

    @Test
    void testFindAllByCategoryAndManufacturer() {
        // Arrange
        Integer categoryId = 1;
        Integer manufacturerId = 1;
        Category category = new Category();
        Manufacturer manufacturer = new Manufacturer();
        when(categoryDao.findById(eq(categoryId))).thenReturn(Optional.of(category));
        when(manufacturerDao.findById(eq(manufacturerId))).thenReturn(Optional.of(manufacturer));
        when(productDao.findAllByCategoryAndManufacturer(eq(category), eq(manufacturer))).thenReturn(new ArrayList<>());

        // Act
        List<Product> products = productService.findAllByCategoryAndManufacturer(categoryId, manufacturerId);

        // Assert
        assertNotNull(products);
        verify(categoryDao, times(1)).findById(eq(categoryId));
        verify(manufacturerDao, times(1)).findById(eq(manufacturerId));
        verify(productDao, times(1)).findAllByCategoryAndManufacturer(eq(category), eq(manufacturer));
    }

    @Test
    void testDeleteProductById() {
        // Arrange
        Long productId = 1L;
        Product expectedProduct = new Product();
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(expectedProduct));
        when(productImageDao.findAllByProduct(eq(expectedProduct))).thenReturn(new ArrayList<>());

        // Act
        productService.deleteProductById(productId);

        // Assert
        verify(productDao, times(1)).findById(eq(productId));
        verify(productImageDao, times(1)).findAllByProduct(eq(expectedProduct));
        verify(productImageDao, times(1)).deleteAll(anyList());
        verify(productDao, times(1)).deleteById(eq(productId));
    }

    @Test
    void testSetVerification() {
        // Arrange
        Long productId = 1L;
        Product expectedProduct = new Product();
        when(productDao.findById(eq(productId))).thenReturn(Optional.of(expectedProduct));
        when(productDao.save(eq(expectedProduct))).thenReturn(expectedProduct);

        // Act
        Product actualProduct = productService.setVerification(productId);

        // Assert
        assertEquals(expectedProduct, actualProduct);
        assertEquals(Verification.VERIFIED, actualProduct.getIsVerified());
        verify(productDao, times(1)).findById(eq(productId));
        verify(productDao, times(1)).save(eq(expectedProduct));
    }
}