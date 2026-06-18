package com.shop.features.cart.entity;

import com.shop.features.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

     @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

     @Column(nullable = false)
    private Integer quantity;

     @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
     @Column(nullable = false)
     private String color;
     
}