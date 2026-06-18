package com.shop.features.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LoginRequestDto {
		
		@Email
		@NotNull
		private String email;
		
		@NotNull
		private String password;
		
		
	
}

