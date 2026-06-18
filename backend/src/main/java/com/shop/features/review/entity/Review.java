package com.shop.features.review.entity;

import java.time.LocalDateTime;

import com.shop.features.product.entity.Product;
import com.shop.features.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(name="reviews",
			uniqueConstraints= {
					@UniqueConstraint(columnNames = {
							"user_id",
							"product_id"
					}
				)
			}
		)

public class Review {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id ; 
		
		@ManyToOne
		@JoinColumn(name="user_id",
						nullable = false
				)
		private User user ;
		
		@ManyToOne
		@JoinColumn(name="product_id",
						nullable = false
				)
		private Product product;
		
		@Column(nullable = false)
	    private Integer rating;
		
		@Column(nullable = false,
					length = 1000
				)
		private String comment; 
		
		
		@Column(nullable = false,
					updatable = false
				)
		
		private LocalDateTime createdAt;
		
		@PrePersist
		public void onCreate() {
			createdAt=LocalDateTime.now();
		}	
}

















