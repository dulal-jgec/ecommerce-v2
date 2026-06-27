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
					.userId(
							review.getId()
							)
					
					.userName(
						review.getUser().getFullName()
					)
					.profileImage(
							review.getUser().getProfileImage()
							)
					.rating(
						    review.getRating()
					)
					.comment(
							review.getComment()
				    )
					.featured(
							review.getFeatured()
							)
					
					.createdAt(
							review.getCreatedAt()
					)
					.build();
					
		}
}
