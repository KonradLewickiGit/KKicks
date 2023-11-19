package com.kkicks.backend.entity.Payment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kkicks.backend.entity.Order.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Random;

@Entity
@Data
@AllArgsConstructor
public class Payment {
    public Payment() {
        this.paymentDate = new Date();
        this.isApproved = new Random().nextBoolean();
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(name = "price",precision = 8,scale = 2,nullable = false)
    private BigDecimal price;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private Boolean isApproved;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDate;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @OneToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;
}
