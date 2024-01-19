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
import org.aspectj.weaver.ast.Or;
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
    public Order createOrder(Long userId,Long productId, Provider provider, BigDecimal shipPrice){
        User buyer = userDao.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Buyer not found"));
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        User seller = userDao.findById(product.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Seller not found"));
        if(buyer.getId().equals(seller.getId())){
            throw new IllegalCallerException("Product cant be bought by seller");
        }
        Order order = new Order();
        order.setProduct(product);
        order.setProvider(provider);
        order.setBuyer(buyer);
        order.setSeller(seller);
        order.setPrice(product.getPrice().add(shipPrice));
        return orderDao.save(order);
    }
    public List<Order> findAll(){
        return orderDao.findAll();
    }

    public List<Order> findAllBySellerId(Long userId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return orderDao.findAllBySeller(user);
    }

    public List<Order> findAllByBuyer(Long userId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return orderDao.findAllByBuyer(user);
    }

    public Order findByBuyerAndProduct(Long userId, Long productId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return orderDao.findByBuyerAndProduct(user,product);
    }
    public Order findBySellerAndProduct(Long userId, Long productId){
        User user = userDao.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return orderDao.findBySellerAndProduct(user,product);
    }

    public Order setStatusToSent(Long orderId){
        Order order = orderDao.findById(orderId).orElseThrow(() -> new EntityNotFoundException("Order not found"));
        if(order.getStatus().equals(Status.PAID)){
            order.setStatus(Status.ON_DELIVERY);
        }
        return orderDao.save(order);
    }
    public Order setStatusToDelivered(Long orderId){
        Order order = orderDao.findById(orderId).orElseThrow(() -> new EntityNotFoundException("Order not found"));
        if(order.getStatus().equals(Status.ON_DELIVERY)){
            order.setStatus(Status.DELIVERED);
        }
        return orderDao.save(order);
    }


    public Payment processPayment(Long orderId, PaymentMethod paymentMethod){
        Order order = orderDao.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        Product product = order.getProduct();
        Payment orderPayment = new Payment();
        orderPayment.setPaymentMethod(paymentMethod);
        orderPayment.setPrice(order.getPrice());
        if(!orderPayment.getIsApproved()){
            order.setStatus(Status.CANCELED);
            orderPayment.setStatus(PaymentStatus.CANCELED);
        } else {
            order.setStatus(Status.PAID);
            orderPayment.setStatus(PaymentStatus.COMPLETE);
            product.setOrder(order);
            product.setAvailability(Availability.SOLD);
        }
        orderDao.save(order);
        productDao.save(product);
        orderPayment.setOrder(order);
        return paymentDao.save(orderPayment);
    }

    public Order findById(Long orderId) {
        return orderDao.findById(orderId).orElseThrow(() -> new EntityNotFoundException("Order not found!"));
    }
}
