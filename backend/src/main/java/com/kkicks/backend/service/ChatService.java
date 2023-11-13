package com.kkicks.backend.service;

import com.kkicks.backend.dao.ChatDao;
import com.kkicks.backend.entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    ChatDao chatDao;

    public Chat getChatByProductId(Long productId){
        return chatDao.findByProductId(productId).orElse(null);
    }
}
