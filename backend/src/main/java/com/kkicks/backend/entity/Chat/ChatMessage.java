package com.kkicks.backend.entity.Chat;

import lombok.Data;

@Data
public class ChatMessage {
    private String content;
    private String sender;
    private Status status;
}
