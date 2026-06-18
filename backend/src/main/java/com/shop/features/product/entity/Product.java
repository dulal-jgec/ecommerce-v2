package com.shop.features.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.shop.features.user.entity.User;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "seller_id")
	private User seller;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     
    @Column(nullable = false, length = 100)
    private String name;

     
    @Column(nullable = false, length = 1000)
    private String description;

     
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

     
    @Column(length = 50)
    private String category;

    @Column(length = 30)
    private String color;

    @Column(length = 20)
    private String size;

    
    @Column(nullable = false)
    private Integer stock;

     
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    
    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private java.util.List<ProductImage> images =
            new java.util.ArrayList<>();

    @Column(nullable = false)
    private Boolean featured = false;
    
    @Column(nullable = false)
    private Boolean newArrival = false;
    
    
    @Column(nullable = false)
    private Boolean bestSeller=false;
    
    @Column(nullable = false)
    private Boolean trending = false; 
    
    
    
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}