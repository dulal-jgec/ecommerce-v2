package com.shop.features.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.shop.common.dto.ApiResponse;
import com.shop.features.payment.dto.CreatePaymentRequestDto;
import com.shop.features.payment.dto.VerifyPaymentRequestDto;
import com.shop.features.payment.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createPayment(
            Authentication authentication,
            @Valid @RequestBody
            CreatePaymentRequestDto request
    ) {

        String email =
                authentication.getName();

        var response =
                paymentService.createPayment(
                        email,
                        request
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message(
                                "Payment created successfully"
                        )
                        .data(response)
                        .build()
        );
    }
    
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<?>> verifyPayment(
    		@Valid @RequestBody 
    		VerifyPaymentRequestDto request )
    {
    	boolean verified=
    			paymentService.verifyPayment(request);
    			
    			
    			return ResponseEntity.ok(
    					ApiResponse.builder()
    					.success(verified)
    					.message(verified 
    							? "Payment verified successfully"
    									:"payment verification failed"
    							)
    					.build()
    					);
    					
    }
    		
}