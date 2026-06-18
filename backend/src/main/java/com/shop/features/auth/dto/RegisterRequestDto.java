package com.shop.features.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto {
	
		@Email
		@NotBlank
		private String email;
		
		@NotBlank
		@Size(min=6)
		private String password;
		
		private String role;
		
		private String shopName;
		private String description;
		private String logo;
}
