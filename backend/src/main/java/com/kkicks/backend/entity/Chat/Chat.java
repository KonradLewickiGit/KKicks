package com.kkicks.backend.entity.Chat;

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
public class Chat {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "product_id")
    private Product product;
}
