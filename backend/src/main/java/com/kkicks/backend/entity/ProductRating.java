package com.kkicks.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(1) @Max(5)
    private int stars;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "product_id")
    private Product product;
}
