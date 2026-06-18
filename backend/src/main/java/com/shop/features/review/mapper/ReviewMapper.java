package com.shop.features.review.mapper;

import com.shop.features.review.dto.ReviewResponseDto;
import com.shop.features.review.entity.Review;

public class ReviewMapper {
		private ReviewMapper() {
			
		}
		public static ReviewResponseDto toResponse(
				 Review review
		) {
			return ReviewResponseDto.builder()
					.reviewId(review.getId())
					.userName(
						review.getUser().getEmail()
					)
					.rating(
						    review.getRating()
					)
					.comment(
							review.getComment()
				    )
					.createdAt(
							review.getCreatedAt()
					)
					.build();
					
		}
}
