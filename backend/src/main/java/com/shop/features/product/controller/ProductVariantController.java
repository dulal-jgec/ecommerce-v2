package com.shop.features.product.controller;

import com.shop.common.dto.ApiResponse;
import com.shop.features.product.dto.ProductVariantRequestDto;
import com.shop.features.product.service.ProductVariantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;

    @PostMapping("/{productId}/variants")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    public ResponseEntity<?> addVariant(
            @PathVariable Long productId,
            @Valid @RequestBody ProductVariantRequestDto request
    ) {

        var response =
                productVariantService.addVariant(
                        productId,
                        request
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Variant added successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/{productId}/variants")
    public ResponseEntity<?> getVariants(
            @PathVariable Long productId
    ) {

        var response =
                productVariantService.getVariants(productId);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Variants fetched successfully")
                        .data(response)
                        .build()
        );
    }
}