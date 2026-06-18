package com.shop.features.cart.controller;

import com.shop.common.dto.ApiResponse;
import com.shop.config.AppConfig;
import com.shop.features.cart.dto.AddToCartRequestDto;
import com.shop.features.cart.dto.UpdateCartItemDto;
import com.shop.features.cart.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final AppConfig appConfig;

    private final CartService cartService;


    @PostMapping
    public ResponseEntity<ApiResponse<?>> addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequestDto request
    ) {

        String email = authentication.getName();

        var response = cartService.addToCart(email, request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Item added to cart")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getCart(
            Authentication authentication
    ) {

        String email = authentication.getName();

        var response = cartService.getCart(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Cart fetched successfully")
                        .data(response)
                        .build()
        );
    }
    
    @PutMapping("/quantity")
    public ResponseEntity<ApiResponse<?>> updateQuEntity(
    		Authentication authentication,
    		@Valid @RequestBody UpdateCartItemDto request
    		){
    	
    	String email = authentication.getName();
    	
    	var response = cartService.updateQuantity(email, request);
    	
    	
    	return ResponseEntity.ok(
    			 ApiResponse.builder()
    			 .success(true)
    			 .message("cart updated successfully")
    			 .data(response)
    			 .build()
    		);
    }
    
    @DeleteMapping("items/{cartItemId}")
    
    public ResponseEntity<ApiResponse<?>> removeItem(
    	Authentication authentication,
    	@PathVariable Long cartItemId		
    ){
    	String email = authentication.getName();
    	
    	cartService.removeItem(email, cartItemId);
    	
    	
    	return ResponseEntity.ok(
    			ApiResponse.builder()
    			.success(true)
    			.message("Item removed succesffully")
    			.data(null)
    			.build()
    			);
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<?>> clearCart(
            Authentication authentication
    ) {

        String email = authentication.getName();

        cartService.clearCart(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Cart cleared successfully")
                        .data(null)
                        .build()
        );
    }
     
    
}