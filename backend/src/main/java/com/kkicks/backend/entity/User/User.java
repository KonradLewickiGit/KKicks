package com.kkicks.backend.entity.User;

import com.kkicks.backend.entity.*;
import com.kkicks.backend.entity.Product.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
public class User implements UserDetails {
    public User() {
        this.browserMode = BrowserMode.LIGHT;
        this.fontSize = FontSize.SMALL;
        this.role = Role.USER;
        this.isNonExpired = true;
    }

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String username;
    @Column(nullable = false)
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
    @Column(nullable = false,unique = true)
    @Email(message = "Email must be valid")
    private String email;
    @Column(nullable = false)
    @Pattern(regexp = "^[A-Za-z]+$")
    private String firstName;
    @Column(nullable = false)
    @Pattern(regexp = "^[A-Za-z]+$")
    private String lastName;
    @Size(min = 9, max = 12, message = "phone number must be between 9 and 12 characters")
    private String phoneNumber;
    private boolean isNonExpired;
    @Enumerated(EnumType.STRING)
    private FontSize fontSize;
    @Enumerated(EnumType.STRING)
    private BrowserMode browserMode;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToOne(mappedBy = "user")
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
