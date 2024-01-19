package com.kkicks.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    @Pattern(regexp = "^\\d{2}-\\d{3}$")
    private String zipCode;
    @Column(nullable = false)
    private String street;
    @Column(nullable = false)
    private String buildingNumber;
    @PositiveOrZero
    private int apartmentNumber;
    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
