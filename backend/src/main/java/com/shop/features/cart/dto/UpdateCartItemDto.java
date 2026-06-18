package com.shop.features.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCartItemDto {
	
	@NotNull
	private Long cartItemId; 
	
	
	@NotNull
	@Min(1)
	private Integer quantity;
	
}
