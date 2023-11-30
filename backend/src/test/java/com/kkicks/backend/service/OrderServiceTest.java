package com.kkicks.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.kkicks.backend.dao.OrderDao;
import com.kkicks.backend.dao.PaymentDao;
import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.dao.UserDao;
import com.kkicks.backend.entity.Order.Order;
import com.kkicks.backend.entity.Order.Provider;
import com.kkicks.backend.entity.Order.Status;
import com.kkicks.backend.entity.Payment.Payment;
import com.kkicks.backend.entity.Payment.PaymentMethod;
import com.kkicks.backend.entity.Payment.PaymentStatus;
import com.kkicks.backend.entity.Product.Availability;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.transaction.annotation.Transactional;

class OrderServiceTest {
    @Mock
    private OrderDao orderDao;

    @Mock
    private UserDao userDao;

    @Mock
    private ProductDao productDao;

    @Mock
    private PaymentDao paymentDao;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateOrder() {
        Long userId = 1L;
        Long productId = 101L;
        Provider provider = Provider.DHL;
        BigDecimal shipPrice = BigDecimal.valueOf(9.99);


        User buyer = new User();
        buyer.setId(userId);

        Product product = new Product();
        product.setId(productId);
        product.setUser(new User());
        product.setPrice(BigDecimal.valueOf(199.99));

        User seller = new User();
        seller.setId(product.getUser().getId());

        when(userDao.findById(userId)).thenReturn(Optional.of(buyer));
        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(userDao.findById(product.getUser().getId())).thenReturn(Optional.of(seller));
        when(orderDao.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.createOrder(userId, productId, provider, shipPrice);

        assertEquals(product, result.getProduct());
        assertEquals(provider, result.getProvider());
        assertEquals(buyer, result.getBuyer());
        assertEquals(seller, result.getSeller());
        assertEquals(product.getPrice().add(shipPrice), result.getPrice());
    }

    @Test
    public void testFindAll() {
        Order order1 = new Order();
        Order order2 = new Order();

        when(orderDao.findAll()).thenReturn(Arrays.asList(order1, order2));

        List<Order> result = orderService.findAll();

        assertEquals(2, result.size());
        assertTrue(result.contains(order1));
        assertTrue(result.contains(order2));
    }

    @Test
    public void testFindAllBySellerId() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        Order order1 = new Order();
        Order order2 = new Order();

        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(orderDao.findAllBySeller(user)).thenReturn(Arrays.asList(order1, order2));

        List<Order> result = orderService.findAllBySellerId(userId);

        assertEquals(2, result.size());
        assertTrue(result.contains(order1));
        assertTrue(result.contains(order2));
    }

    @Test
    public void testFindAllByBuyer() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        Order order1 = new Order();
        Order order2 = new Order();

        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(orderDao.findAllByBuyer(user)).thenReturn(Arrays.asList(order1, order2));

        List<Order> result = orderService.findAllByBuyer(userId);

        assertEquals(2, result.size());
        assertTrue(result.contains(order1));
        assertTrue(result.contains(order2));
    }

    @Test
    public void testFindByBuyerAndProduct() {
        Long userId = 1L;
        Long productId = 101L;

        User user = new User();
        user.setId(userId);

        Product product = new Product();
        product.setId(productId);

        Order order = new Order();

        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(orderDao.findByBuyerAndProduct(user, product)).thenReturn(order);

        Order result = orderService.findByBuyerAndProduct(userId, productId);

        assertEquals(order, result);
    }

    @Test
    public void testFindBySellerAndProduct() {
        Long userId = 1L;
        Long productId = 101L;

        User user = new User();
        user.setId(userId);

        Product product = new Product();
        product.setId(productId);

        Order order = new Order();

        when(userDao.findById(userId)).thenReturn(Optional.of(user));
        when(productDao.findById(productId)).thenReturn(Optional.of(product));
        when(orderDao.findBySellerAndProduct(user, product)).thenReturn(order);

        Order result = orderService.findBySellerAndProduct(userId, productId);

        assertEquals(order, result);
    }

    @Test
    @Transactional
    public void testProcessPaymentWhenPaymentApproved() {
        Long orderId = 1L;
        PaymentMethod paymentMethod = PaymentMethod.BLIK;

        Order order = new Order();
        order.setId(orderId);
        order.setStatus(Status.CREATED);

        Product product = new Product();
        product.setPrice(BigDecimal.valueOf(199.99));
        product.setAvailability(Availability.AVAILABLE);

        order.setProduct(product);

        Payment orderPayment = new Payment();
        orderPayment.setIsApproved(true);

        when(orderDao.findById(orderId)).thenReturn(Optional.of(order));
        when(paymentDao.save(any(Payment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Payment result = orderService.processPayment(orderId, paymentMethod);

        assertEquals(order.getPrice(), result.getPrice());
        assertEquals(order, result.getOrder());
        assertEquals(paymentMethod, result.getPaymentMethod());

        assertEquals(Status.COMPLETED, order.getStatus());
        assertEquals(PaymentStatus.COMPLETE, result.getStatus());
        assertEquals(Availability.SOLD, product.getAvailability());
    }
    @Test
    @Transactional
    public void testProcessPaymentWhenPaymentisNotApproved() {
        Long orderId = 1L;
        PaymentMethod paymentMethod = PaymentMethod.BLIK;

        Order order = new Order();
        order.setId(orderId);
        order.setStatus(Status.CREATED);

        Product product = new Product();
        product.setPrice(BigDecimal.valueOf(199.99));
        product.setAvailability(Availability.AVAILABLE);

        order.setProduct(product);

        Payment orderPayment = new Payment();
        orderPayment.setIsApproved(false);

        when(orderDao.findById(orderId)).thenReturn(Optional.of(order));
        when(paymentDao.save(any(Payment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Payment result = orderService.processPayment(orderId, paymentMethod);

        assertEquals(order.getPrice(), result.getPrice());
        assertEquals(order, result.getOrder());
        assertEquals(paymentMethod, result.getPaymentMethod());

        assertEquals(Status.CANCELED, order.getStatus());
        assertEquals(PaymentStatus.CANCELED, result.getStatus());
        assertEquals(Availability.AVAILABLE, product.getAvailability());
    }

    @Test
    public void testFindById() {
        Long orderId = 1L;

        Order order = new Order();
        order.setId(orderId);

        when(orderDao.findById(orderId)).thenReturn(Optional.of(order));

        Order result = orderService.findById(orderId);

        assertEquals(order, result);
    }

    @Test
    public void testFindByIdNotFound() {
        Long orderId = 1L;

        when(orderDao.findById(orderId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> orderService.findById(orderId));
    }
}