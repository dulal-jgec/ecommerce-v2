package com.shop.features.auth.controller;

import java.lang.module.ModuleDescriptor.Builder;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.common.dto.ApiResponse;
import com.shop.features.auth.dto.AuthResponseDto;
import com.shop.features.auth.dto.LoginRequestDto;
import com.shop.features.auth.dto.RefreshTokenRequestDto;
import com.shop.features.auth.dto.RegisterRequestDto;
import com.shop.features.auth.entity.RefreshToken;
import com.shop.features.auth.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
		
	private final AuthService authService;
	
	@PostMapping("/register")
	
	public ResponseEntity<ApiResponse<?>>register(
			@Valid @RequestBody RegisterRequestDto request
			){
		authService.register(request);
		
		return ResponseEntity.ok(
				ApiResponse.builder()
				.success(true)
				.message("User registered succesfuly")
				.build()
				);
	} 
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<?>> login(
	        @Valid @RequestBody LoginRequestDto request
	) {

	    AuthResponseDto response = authService.login(request);

	    return ResponseEntity.ok(
	            ApiResponse.builder()
	                    .success(true)
	                    .message("Login successful")
	                    .data(response)
	                    .build()
	    );
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<?>> refreshToken(
			@Valid @RequestBody RefreshTokenRequestDto request
			){
		 
		AuthResponseDto response = authService.refreshToken(request.getRefreshToken());
		
		return ResponseEntity.ok(
				ApiResponse.builder()
				.success(true)
				.message("Token refreshment")
				.data(response)
				.build()
				);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<?>> logout(
	        @Valid @RequestBody RefreshTokenRequestDto request
	) {

	    authService.logout(request.getRefreshToken());

	    return ResponseEntity.ok(
	            ApiResponse.builder()
	                    .success(true)
	                    .message("Logged out successfully")
	                    .data(null)
	                    .build()
	    );
	}
	
}






















