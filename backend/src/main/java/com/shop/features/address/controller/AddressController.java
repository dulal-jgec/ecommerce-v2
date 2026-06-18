package com.shop.features.address.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.shop.common.dto.ApiResponse;
import com.shop.features.address.dto.AddressRequestDto;
import com.shop.features.address.service.AddressService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createAddress(
            Authentication authentication,
            @Valid @RequestBody AddressRequestDto request
    ) {

        String email = authentication.getName();

        var response =
                addressService.createAddress(email, request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Address created successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMyAddresses(
            Authentication authentication
    ) {

        String email = authentication.getName();

        var response =
                addressService.getMyAddresses(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Addresses fetched successfully")
                        .data(response)
                        .build()
        );
    }
    @PutMapping("/{addressId}")
    public ResponseEntity<ApiResponse<?>> updateAddress(
            Authentication authentication,
            @PathVariable Long addressId,
            @Valid @RequestBody AddressRequestDto request
    ) {

        String email = authentication.getName();

        var response = addressService.updateAddress(
                email,
                addressId,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Address updated successfully")
                        .data(response)
                        .build()
        );
    }
    
    
    
    @DeleteMapping("/{addressId}")
    public ResponseEntity<ApiResponse<?>> deleteAddress(
            Authentication authentication,
            @PathVariable Long addressId
    ) {

        String email = authentication.getName();

        addressService.deleteAddress(
                email,
                addressId
        );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Address deleted successfully")
                        .build()
        );
    }
    
    
    @PatchMapping("/{addressId}/default")
    public ResponseEntity<ApiResponse<?>> setDefaultAddress(
            Authentication authentication,
            @PathVariable Long addressId
    ) {

        String email = authentication.getName();

        var response =
                addressService.setDefaultAddress(
                        email,
                        addressId
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Default address updated")
                        .data(response)
                        .build()
        );
    }
}