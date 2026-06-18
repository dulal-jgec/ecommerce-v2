package com.shop.features.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenRequestDto  {

	@NotBlank	
	private String refreshToken;
	
	
}
