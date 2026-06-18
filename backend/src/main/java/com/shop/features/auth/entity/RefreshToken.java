package com.shop.features.auth.entity;

import java.time.LocalDateTime;

import com.shop.features.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="refresh_tokens")
@Getter
@Setter
public class RefreshToken {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ; 
	
	@Column(nullable = false , unique = true)
	private String token; 
	
	@OneToOne
	@JoinColumn(name="user_id" , nullable = false)
	private User user;
	
	@Column(nullable = false)
	private LocalDateTime expiryDate;	
}
