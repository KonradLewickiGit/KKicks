package com.kkicks.backend.entity.Product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.*;
import com.kkicks.backend.entity.Order.Order;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

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
    @Min(20) @Max(60)
    private BigDecimal size;
    @Column(name = "price",precision = 8,scale = 2,nullable = false)
    @Positive
    private BigDecimal price;
    @Column(nullable = false)
    private String description;
    private String color;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Availability availability;
    @Column(name = "isVerified")
    @Enumerated(EnumType.STRING)
    private Verification isVerified;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "posted_by_user_id")
    private User user;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToOne(mappedBy = "product")
    @JsonIgnore
    private Order order;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<ProductImage> productImage;

}
