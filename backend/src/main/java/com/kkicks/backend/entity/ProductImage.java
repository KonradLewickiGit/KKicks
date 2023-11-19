package com.kkicks.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.Product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String path;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "product_id")
    private Product product;
}
