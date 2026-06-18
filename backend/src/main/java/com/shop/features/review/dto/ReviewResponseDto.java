package com.shop.features.review.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewResponseDto {
	
	private Long reviewId;  
	private String userName; 
	private Integer rating ; 
	private String comment; 
	private LocalDateTime createdAt; 	
}
