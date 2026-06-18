package com.shop.features.payment.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.shop.features.order.entity.Order;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="payments")
@Getter
@Setter
public class Payment {
		
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long id; 
	
	@OneToOne
	@JoinColumn(name="order_id", nullable = false)
	private Order order;
	
	@Column(nullable = false , precision = 10, scale = 2)
	private BigDecimal amount ; 
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentStatus status; 
	
	private String razorpayPaymentId; 
	
	private String razorpayOrderId; 
	
	@Column(length = 1000)
    private String razorpaySignature;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }	
	
}
