package com.shop.features.review.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
@Getter
@Builder
public class ReviewResponseDto {

    private Long reviewId;

    private Long userId;

    private String userName;

    private String profileImage;

    private Integer rating;

    private String comment;

    private Boolean featured;

    private LocalDateTime createdAt;
}