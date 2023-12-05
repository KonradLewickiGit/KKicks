package com.kkicks.backend.service;

import com.kkicks.backend.dao.ChatDao;
import com.kkicks.backend.dao.ProductDao;
import com.kkicks.backend.entity.Chat.Chat;
import com.kkicks.backend.entity.Product.Product;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    ChatDao chatDao;
    @Autowired
    ProductDao productDao;

    public Chat getChatByProductId(Long productId){
        Product product = productDao.findById(productId).orElseThrow(() -> new EntityNotFoundException("product not found"));
        return chatDao.findByProduct(product).orElseThrow(() -> new EntityNotFoundException("chat not found"));
    }
}