package com.kkicks.backend.auth;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String login;
    private String passwd;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
