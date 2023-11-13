package com.kkicks.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
public class ChatMessage {
    private String content;
    private String sender;
    private Status status;
}
