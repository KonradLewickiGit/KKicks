package com.kkicks.backend.service;

import com.kkicks.backend.dao.AddressDao;
import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Address;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.Role;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {
    @Mock
    private UserDao userDao;

    @Mock
    private ProductDao productDao;

    @Mock
    private AddressDao addressDao;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAdministrator() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userDao.save(existingUser)).thenReturn(existingUser);

        User result = userService.createAdministrator(userId);

        assertEquals(Role.ADMIN, result.getRole());
        verify(userDao, times(1)).save(existingUser);
    }
    @Test
    public void testCreateAdministratorUserNotFound() {
        Long userId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.createAdministrator(userId));
        verify(userDao, never()).save(any());
    }

    @Test
    public void testFindAll() {
        when(userDao.findAll()).thenReturn(Collections.emptyList());

        List<User> result = userService.findAll();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testFindUserById() {
        Long userId = 1L;
        User existingUser = new User();
        existingUser.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));

        User result = userService.findUserById(userId);

        assertEquals(existingUser, result);

    }
    @Test
    public void testFindUserByIdUserNotFound() {
        Long userId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> userService.findUserById(userId));
    }
    @Test
    public void testDeleteUserByID() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userDao.save(existingUser)).thenReturn(existingUser);

        userService.deleteUserByID(userId);

        assertFalse(existingUser.isNonExpired());
        verify(userDao, times(1)).save(existingUser);
    }
    @Test
    public void testDeleteUserByIdUserNotFound() {
        Long userId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.deleteUserByID(userId));
        verify(userDao, never()).save(any());
    }

    @Test
    public void testFindAllObservedProductsByUserId() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setObservedProducts(new ArrayList<Product>());

        Product observedProduct1 = new Product();
        observedProduct1.setId(1L);
        Product observedProduct2 = new Product();
        observedProduct2.setId(2L);

        existingUser.addProductToObserved(observedProduct1);
        existingUser.addProductToObserved(observedProduct2);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));

        List<Product> result = userService.findAllObservedProductsByUserId(userId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(observedProduct1));
        assertTrue(result.contains(observedProduct2));
    }
    @Test
    public void testFindAllObservedProductsByUserIdUserNotFound() {
        Long userId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.findAllObservedProductsByUserId(userId));
    }

    @Test
    public void testAddProductToObserved() {
        Long userId = 1L;
        Long productId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setObservedProducts(new ArrayList<Product>());

        Product productToAdd = new Product();
        productToAdd.setId(productId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(productDao.findById(productId)).thenReturn(Optional.of(productToAdd));
        when(userDao.save(existingUser)).thenReturn(existingUser);

        User result = userService.addProductToObserved(userId, productId);

        assertTrue(result.getObservedProducts().contains(productToAdd));
        verify(userDao, times(1)).save(existingUser);
    }
    @Test
    public void testAddProductToObservedUserNotFound() {
        Long userId = 1L;
        Long productId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.addProductToObserved(userId, productId));
        verify(productDao, never()).findById(any());
        verify(userDao, never()).save(any());
    }
    @Test
    public void testAddProductToObservedProductNotFound() {
        Long userId = 1L;
        Long productId = 101L;

        User existingUser = new User();
        existingUser.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(productDao.findById(productId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.addProductToObserved(userId, productId));
        verify(userDao, never()).save(any());
    }
    @Test
    public void testAddProductToObservedProductAlreadyObserved() {
        Long userId = 1L;
        Long productId = 101L;

        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setObservedProducts(new ArrayList<Product>());

        Product existingProduct = new Product();
        existingProduct.setId(productId);

        existingUser.addProductToObserved(existingProduct);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(productDao.findById(productId)).thenReturn(Optional.of(existingProduct));

        assertThrows(IllegalArgumentException.class, () -> userService.addProductToObserved(userId, productId));
        verify(userDao, never()).save(any());
    }

    @Test
    public void testDeleteProductFromObserved() {
        Long userId = 1L;
        Long productId = 101L;

        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setObservedProducts(new ArrayList<Product>());

        Product productToRemove = new Product();
        productToRemove.setId(productId);

        existingUser.addProductToObserved(productToRemove);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(productDao.findById(productId)).thenReturn(Optional.of(productToRemove));
        when(userDao.save(existingUser)).thenReturn(existingUser);

        User result = userService.deleteProductFromObserved(userId, productId);

        assertFalse(result.getObservedProducts().contains(productToRemove));
        verify(userDao, times(1)).save(existingUser);
    }

    @Test
    public void testDeleteProductFromObservedUserNotFound() {
        Long userId = 1L;
        Long productId = 101L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.deleteProductFromObserved(userId, productId));
        verify(productDao, never()).findById(any());
        verify(userDao, never()).save(any());
    }

    @Test
    public void testDeleteProductFromObservedProductNotFound() {
        Long userId = 1L;
        Long productId = 101L;

        User existingUser = new User();
        existingUser.setId(userId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(productDao.findById(productId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.deleteProductFromObserved(userId, productId));
        verify(userDao, never()).save(any());
    }

    @Test
    public void testDeleteProductFromObservedProductNotObserved() {
        Long userId = 1L;
        Long productId = 101L;

        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setObservedProducts(new ArrayList<Product>());

        Product existingProduct = new Product();
        existingProduct.setId(productId);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(productDao.findById(productId)).thenReturn(Optional.of(existingProduct));

        assertThrows(IllegalArgumentException.class, () -> userService.deleteProductFromObserved(userId, productId));
        verify(userDao, never()).save(any());
    }

    @Test
    public void testUpdateUserData() {
        Long userId = 1L;

        User existingUser = new User();
        existingUser.setId(userId);

        User updatedUserData = new User();
        updatedUserData.setFirstName("UpdatedFirstName");
        updatedUserData.setLastName("UpdatedLastName");
        updatedUserData.setEmail("updated@example.com");
        updatedUserData.setUsername("updatedUsername");
        updatedUserData.setPassword("updatedPassword");
        updatedUserData.setPhoneNumber("1234567890");

        Address address = new Address();
        address.setStreet("UpdatedStreet");
        address.setCity("UpdatedCity");
        address.setZipCode("UpdatedZipCode");
        updatedUserData.setAddress(address);

        when(userDao.findById(userId)).thenReturn(Optional.of(existingUser));
        when(addressDao.save(any(Address.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(userDao.saveAndFlush(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.updateUserData(userId, updatedUserData);

        assertEquals(updatedUserData.getFirstName(), result.getFirstName());
        assertEquals(updatedUserData.getLastName(), result.getLastName());
        assertEquals(updatedUserData.getEmail(), result.getEmail());
        assertEquals(updatedUserData.getUsername(), result.getUsername());
        assertEquals(updatedUserData.getPassword(), result.getPassword());
        assertEquals(updatedUserData.getPhoneNumber(), result.getPhoneNumber());

        assertNotNull(result.getAddress());
        assertEquals(updatedUserData.getAddress().getStreet(), result.getAddress().getStreet());
        assertEquals(updatedUserData.getAddress().getCity(), result.getAddress().getCity());
        assertEquals(updatedUserData.getAddress().getZipCode(), result.getAddress().getZipCode());

        verify(addressDao, times(1)).save(any(Address.class));
        verify(userDao, times(1)).saveAndFlush(any(User.class));
    }

    @Test
    public void testUpdateUserDataUserNotFound() {
        Long userId = 1L;

        when(userDao.findById(userId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.updateUserData(userId, new User()));
        verify(addressDao, never()).save(any(Address.class));
        verify(userDao, never()).saveAndFlush(any(User.class));
    }

    @Test
    public void testFindUserByToken() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("Authorization")).thenReturn("Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwic3ViIjoidGVzdCIsImlhdCI6MTcwMTI5NzY3MywiZXhwIjoxNzAxMzA0ODczfQ.QeYOzjSacaHtLhnC3P2IpfpTfLLhPYS6Oi6mlj9nbWY");
        String mockEmail = "test";

        when(userDao.findByEmail(mockEmail)).thenReturn(Optional.of(new User()));

        User result = userService.findUserByToken(request);

        assertNotNull(result);
        verify(userDao, times(1)).findByEmail(mockEmail);
    }

    @Test
    public void testFindUserByTokenInvalidToken() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("Authorization")).thenReturn("Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwic3ViIjoidGVzdCIsImlhdCI6MTcwMTI5NzY3MywiZXhwIjoxNzAxMzA0ODczfQ.QeYOzjSacaHtLhnC3P2IpfpTfLLhPYS6Oi6mlj9nbWY");
        String mockEmail = "test2";

        when(userDao.findByEmail(mockEmail)).thenReturn(Optional.of(new User()));

        User result = userService.findUserByToken(request);

        assertNull(result);
        verify(userDao, never()).findByEmail(mockEmail);
    }
}