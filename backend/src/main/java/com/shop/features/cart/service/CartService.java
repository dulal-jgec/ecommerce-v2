package com.shop.features.cart.service;

import com.shop.features.cart.dto.AddToCartRequestDto;
import com.shop.features.cart.dto.CartResponseDto;
import com.shop.features.cart.dto.UpdateCartItemDto;

public interface CartService {
		CartResponseDto addToCart(String email,AddToCartRequestDto request);
		CartResponseDto getCart(String email);
		
		CartResponseDto updateQuantity(
			String email,
			UpdateCartItemDto request
		);
		
		void removeItem(String email,Long cartItemId);
		void clearCart(String email);
}
