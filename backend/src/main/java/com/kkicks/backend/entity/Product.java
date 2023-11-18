package com.kkicks.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
public class Product {
    public Product() {
        this.availability = Availability.AVAILABLE;
        this.isVerified = Verification.UNVERIFIED;
    }

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String model;
    @Column(name = "size", precision = 3,scale = 1,nullable = false)
    private BigDecimal size;
    @Column(name = "price",precision = 8,scale = 2,nullable = false)
    private BigDecimal price;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Availability availability;
    @Column(name = "isVerified")
    @Enumerated(EnumType.STRING)
    private Verification isVerified;
    private String color;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "posted_by_user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToOne(mappedBy = "product")
    private Order order;

}
