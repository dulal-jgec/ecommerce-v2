package com.shop.features.review.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	Optional<Review> findByUserIdAndProductId(
			Long userId,
			Long productId
			);
	
	List<Review> findByProductId(
				Long productId
			);
	
	List<Review> findByFeaturedTrueAndApprovedTrue();
	
	List<Review> findTop6ByFeaturedTrueAndApprovedTrueOrderByCreatedAtDesc();
	
}
