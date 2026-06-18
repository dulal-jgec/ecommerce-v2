package com.shop.features.order.entity;

import com.shop.features.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //parent order
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    //purchased product snapshot
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    //quantity purchased
    @Column(nullable = false)
    private Integer quantity;

    //price snapshot
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(nullable = false)
    private String color ; 
    
    @Enumerated(EnumType.STRING)
    private OrderItemStatus status;
    
    
}