package com.kkicks.backend.entity.Order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.Payment.Payment;
import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "`order`")
@Data
@AllArgsConstructor
public class Order {
    public Order() {
        this.orderDate = new Date();
        this.status = Status.CREATED;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price",precision = 8,scale = 2,nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @OneToOne
    @JoinColumn(name = "product_id",unique = true)
    private Product product;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @OneToOne(mappedBy = "order")
    private  Payment payment;
}
