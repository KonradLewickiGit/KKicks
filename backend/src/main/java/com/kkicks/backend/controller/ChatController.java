package com.kkicks.backend.controller;

import com.kkicks.backend.entity.Chat.Chat;
import com.kkicks.backend.entity.Chat.ChatMessage;
import com.kkicks.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {
    @Autowired
    ChatService chatService;
    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/product/{productId}/sendMessage")
    public void sendMessage(@DestinationVariable Long productId, @Payload ChatMessage chatMessage) {
        Chat chat = chatService.getChatByProductId(productId);
        if (chat != null && !chatMessage.getContent().isEmpty()) {
            messagingTemplate.convertAndSend("/topic/product/" + productId + "/chatRoom", chatMessage);
        }
    }
    @GetMapping("/getChatByProductId/{productId}")
    public Chat getChatByProductId(@PathVariable Long productId){
        return chatService.getChatByProductId(productId);
    }
}
