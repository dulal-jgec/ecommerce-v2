package com.shop.features.banner.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BannerResponseDto {

    private Long id;

    private String title;

    private String subtitle;

    private String buttonText;

    private String buttonLink;

    private String imageUrl;

    private Integer displayOrder;

    private Boolean active;

    private LocalDateTime createdAt;
}