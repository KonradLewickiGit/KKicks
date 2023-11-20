package com.kkicks.backend.controler;

import com.kkicks.backend.entity.Order.Order;
import com.kkicks.backend.entity.Order.Provider;
import com.kkicks.backend.entity.Payment.Payment;
import com.kkicks.backend.entity.Payment.PaymentMethod;
import com.kkicks.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/create/{userId}/{productId}")
    public Order createOrder(@PathVariable Long userId, @PathVariable Long productId, @RequestBody Provider provider){
        return orderService.createOrder(userId,productId,provider);
    }
    @PostMapping("/pay/{orderId}")
    public Payment pay(@PathVariable Long orderId, @RequestBody PaymentMethod payment){
        return orderService.processPayment(orderId,payment);
    }

    @GetMapping("/findAll")
    public List<Order> findAll(){
        return orderService.findAll();
    }
    @GetMapping("/findAllByUserId/{userId}")
    public List<Order> findAllByUserId(@PathVariable Long userId){
        return orderService.findAllByUserId(userId);
    }
    @GetMapping("/findByUserIdAndProductId/{userId}/{productId}")
    public Order findByUserIdAndProductId(@PathVariable Long userId, @PathVariable Long productId){
        return orderService.findByUserIdAndProductId(userId, productId);
    }
}
