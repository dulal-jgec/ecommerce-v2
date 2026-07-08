package com.shop.features.order.entity;

import com.shop.features.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //items
    
    @OneToMany(mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    //status
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;
    // audit
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
    @Column(nullable = false)
    private String shippingFullName;

    @Column(nullable = false)
    private String shippingPhoneNumber;

    @Column(nullable = false)
    private String shippingAddressLine1;
    

    @Column(nullable = false)
    private String shippingAddressLine2;
    
    @Column(nullable = false)
    private String shippingCity;

    @Column(nullable = false)
    private String shippingState;

    @Column(nullable = false)
    private String shippingPostalCode;

    @Column(nullable = false)
    private String shippingCountry;
}