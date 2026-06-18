package com.shop.features.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddToCartRequestDto {
	
	@NotNull
	private Long productId;
	
	@NotNull
	@Min(1)
	private Integer quantity;
	private String color;
	
	
}
