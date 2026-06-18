package com.shop.features.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.cart.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

}
