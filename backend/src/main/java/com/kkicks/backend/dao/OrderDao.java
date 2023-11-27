package com.kkicks.backend.dao;

import com.kkicks.backend.entity.Order.Order;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDao extends JpaRepository<Order,Long> {

    List<Order> findAllBySeller(User seller);
    List<Order> findAllByBuyer(User buyer);
    Order findBySellerAndProduct(User seller, Product product);
    Order findByBuyerAndProduct(User buyer, Product product);
}
