package com.kkicks.backend.service;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class OrderService {
    @Autowired
    OrderDao orderDao;
    @Autowired
    UserDao userDao;
    @Autowired
    ProductDao productDao;
    @Autowired
    PaymentDao paymentDao;
    public Order createOrder(Long userId, Long productId, Provider provider, BigDecimal shipPrice){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Order order = new Order();
        order.setProduct(product);
        order.setProvider(provider);
        order.setUser(user);
        order.setPrice(product.getPrice().add(shipPrice));
        return orderDao.save(order);
    }
    public List<Order> findAll(){
        return orderDao.findAll();
    }

    public List<Order> findAllByUserId(Long userId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return orderDao.findAllByUser(user);
    }

    public Order findByUserIdAndProductId(Long userId, Long productId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return orderDao.findByUserAndProduct(user,product);
    }


    public Payment processPayment(Long orderId, PaymentMethod paymentMethod){
        Order order = orderDao.findById(orderId).orElseThrow(() -> new EntityNotFoundException("Order not found"));
        Product product = order.getProduct();
        Payment orderPayment = new Payment();
        orderPayment.setPaymentMethod(paymentMethod);
        orderPayment.setPrice(order.getPrice());
        if(!orderPayment.getIsApproved()){
            order.setStatus(Status.CANCELED);
            orderPayment.setStatus(PaymentStatus.CANCELED);
        } else {
            order.setStatus(Status.COMPLETED);
            orderPayment.setStatus(PaymentStatus.COMPLETE);
            product.setOrder(order);
            product.setAvailability(Availability.SOLD);
        }
        orderDao.save(order);
        productDao.save(product);
        orderPayment.setOrder(order);
        return paymentDao.save(orderPayment);
    }
}
