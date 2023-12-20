package com.kkicks.backend.controller;

import com.kkicks.backend.entity.Order.Order;
import com.kkicks.backend.entity.Order.Provider;
import com.kkicks.backend.entity.Payment.Payment;
import com.kkicks.backend.entity.Payment.PaymentMethod;
import com.kkicks.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/create/{buyerId}/{productId}/{provider}")
    public Order createOrder(@PathVariable Long buyerId, @PathVariable Long productId, @PathVariable String provider, @RequestBody BigDecimal shipPrice){
        return orderService.createOrder(buyerId,productId, Provider.valueOf(provider),shipPrice);
    }
    @PostMapping("/pay/{orderId}")
    public Payment pay(@PathVariable Long orderId, @RequestBody PaymentMethod payment){
        return orderService.processPayment(orderId,payment);
    }
    @PostMapping("/changeStatusToOnDelivery/{orderId}")
    public Order changeStatusToOnDelivery(@PathVariable Long orderId){
        return orderService.setStatusToSent(orderId);
    }
    @PostMapping("/changeStatusToDelivered/{orderId}")
    public Order changeStatusToDelivered(@PathVariable Long orderId){
        return orderService.setStatusToDelivered(orderId);
    }

    @GetMapping("/findAll")
    public List<Order> findAll(){
        return orderService.findAll();
    }
    @GetMapping("/findAllByBuyerId/{userId}")
    public List<Order> findAllByUserId(@PathVariable Long userId){
        return orderService.findAllByBuyer(userId);
    }
    @GetMapping("/findAllBySellerId/{userId}")
    public List<Order> findAllBySellerId(@PathVariable Long userId){
        return orderService.findAllBySellerId(userId);
    }
    @GetMapping("/findById/{orderId}")
    public Order findById(@PathVariable Long orderId){
        return orderService.findById(orderId);
    }
    @GetMapping("/findByBuyerIdAndProductId/{userId}/{productId}")
    public Order findByBuyerIdAndProductId(@PathVariable Long userId, @PathVariable Long productId){
        return orderService.findByBuyerAndProduct(userId, productId);
    }
    @GetMapping("/findBySellerIdAndProductId/{userId}/{productId}")
    public Order findBySellerIdAndProductId(@PathVariable Long userId, @PathVariable Long productId){
        return orderService.findBySellerAndProduct(userId, productId);
    }
}
