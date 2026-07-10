package com.shop.features.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.common.dto.ApiResponse;
import com.shop.features.order.dto.PlaceOrderRequestDto;
import com.shop.features.order.dto.UpdateOrderStatusDto;
import com.shop.features.order.entity.UpdateOrderItemStatusDto;
import com.shop.features.order.service.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    
    @PostMapping
    public ResponseEntity<ApiResponse<?>> placeOrder(
            Authentication authentication,
            @Valid @RequestBody PlaceOrderRequestDto request
    ) {

        String email = authentication.getName();

        var response = orderService.placeOrder(
                email,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Order placed successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMyOrders(
            Authentication authentication
    ) {
    	System.out.println(authentication);

        String email = authentication.getName();

        var response = orderService.getMyOrders(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Orders fetched successfully")
                        .data(response)
                        .build()
        );
        
        
        
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<?>>getAllOrders(){
    
    	var response = orderService.getAllOrders();
    	return ResponseEntity.ok(
    			ApiResponse.builder()
    			.success(true)
    			.message("All orders fetched successfully")
    			.data(response)
    			.build()
    			);
    			
    	}
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{orderId}/status")
    public ResponseEntity<ApiResponse<?>>updateOrderStatus(
    		@PathVariable Long orderId,
    		@Valid @RequestBody UpdateOrderStatusDto request
    		){
    			var response = orderService.updateOrderStatus(orderId, request);
    					return ResponseEntity.ok(
    							ApiResponse.builder()
    							.success(true)
    							.message("Order status updated successfully")
    							.data(response)
    							.build()
    				            );
    		}
    
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<?>> getOrderById(
            Authentication authentication,
            @PathVariable Long orderId
    ) {

        String email = authentication.getName();

        var response =
                orderService.getOrderById(
                        email,
                        orderId
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Order fetched successfully")
                        .data(response)
                        .build()
        );
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/{orderId}")
    public ResponseEntity<ApiResponse<?>> getOrderForAdmin(
            @PathVariable Long orderId
    ) {

        var response =
                orderService.getOrderForAdmin (orderId);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Order fetched successfully")
                        .data(response)
                        .build()
        );
    }
    
    @GetMapping("/seller/orders")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> getSellerOrders(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                orderService.getSellerOrders(
                        authentication.getName()
                )
        );
    }
    
    @GetMapping("/seller/orders/{orderItemId}")
    public ResponseEntity<?> getSellerOrderDetails(
            Authentication authentication,
            @PathVariable Long orderItemId
    ) {

        return ResponseEntity.ok(
                orderService.getSellerOrderDetails(
                        authentication.getName(),
                        orderItemId
                )
        );
    }
    @PutMapping("/seller/orders/{orderItemId}/status")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?> updateSellerOrderStatus(
            Authentication authentication,
            @PathVariable Long orderItemId,
            @RequestBody UpdateOrderItemStatusDto request
    ) {

        return ResponseEntity.ok(
                orderService.updateSellerOrderStatus(
                        authentication.getName(),
                        orderItemId,
                        request
                )
        );
    }
     
}