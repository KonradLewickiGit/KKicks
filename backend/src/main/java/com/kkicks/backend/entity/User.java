package com.kkicks.backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String login;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private FontSize fontSize = FontSize.SMALL;
    @Enumerated(EnumType.STRING)
    private BrowserMode browserMode = BrowserMode.LIGHT;
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
    @ManyToMany
    @JoinTable(name = "USER_OBSERVED_PRODUCT",joinColumns = {
            @JoinColumn(name = "USER_ID")
    }, inverseJoinColumns = {
            @JoinColumn(name = "PRODUCT_ID")
    })
    private List<Product> observedProducts;

    public void addProductToObserved(Product product){
        this.observedProducts.add(product);
    }
    public void deleteProductFromObserved(Product product){
        this.observedProducts.remove(product);
    }
}
