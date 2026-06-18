package com.shop.features.cart.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartItemResponseDto {

	private Long productId ; 
	private String productName;
	private Integer quantity;
	private BigDecimal price;
	private String imageUrl;
	private Long cartItemId;
	private String color;
	
}
