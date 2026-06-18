package com.shop.features.cart.dto;


import java.math.BigDecimal;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class CartResponseDto {
	
		
	private Long cartId ;
	private List<CartItemResponseDto> items;
	private BigDecimal totalPrice;
	  
	
	
}
