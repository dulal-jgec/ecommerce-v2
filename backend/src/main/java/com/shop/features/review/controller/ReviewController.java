package com.shop.features.review.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.shop.common.dto.ApiResponse;
import com.shop.features.review.dto.ReviewRequestDto;
import com.shop.features.review.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/products/{productId}")
    public ResponseEntity<ApiResponse<?>> createReview(
            @PathVariable Long productId,
            Authentication authentication,
            @Valid @RequestBody ReviewRequestDto request
    ) {

        String email = authentication.getName();

        var response = reviewService.createReview(
                productId,
                email,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Review created successfully")
                        .data(response)
                        .build()
        );
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<?>> updateReview(
            @PathVariable Long reviewId,
            Authentication authentication,
            @Valid @RequestBody ReviewRequestDto request
    ) {

        String email = authentication.getName();

        var response = reviewService.updateReview(
                reviewId,
                email,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Review updated successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<ApiResponse<?>> getProductReviews(
            @PathVariable Long productId
    ) {

        var response = reviewService.getProductReviews(
                productId
        );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Reviews fetched successfully")
                        .data(response)
                        .build()
        );
    }
}