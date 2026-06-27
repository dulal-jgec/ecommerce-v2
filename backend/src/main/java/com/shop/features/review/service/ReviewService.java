package com.shop.features.review.service;

import java.util.List;

import com.shop.features.review.dto.ReviewRequestDto;
import com.shop.features.review.dto.ReviewResponseDto;

public interface ReviewService {
		ReviewResponseDto createReview(
				Long productId,
				String email,
				ReviewRequestDto request
				);
		
		ReviewResponseDto updateReview(
				Long reviewId,
				String email,
				ReviewRequestDto request
				);
		
		List<ReviewResponseDto>getProductReviews(Long productId);
		
		List<ReviewResponseDto> getFeaturedReviews();

	    ReviewResponseDto featureReview(Long reviewId);

	    ReviewResponseDto unFeatureReview(Long reviewId);
}
