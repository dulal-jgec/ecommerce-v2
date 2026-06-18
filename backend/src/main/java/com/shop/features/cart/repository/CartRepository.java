package com.shop.features.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.cart.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	
	Optional<Cart>findByUserId(Long userId);

}
