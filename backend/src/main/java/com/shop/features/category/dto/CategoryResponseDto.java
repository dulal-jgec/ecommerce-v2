package com.shop.features.category.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryResponseDto {

    private Long id;

    private String name;

    private String imageUrl;

    private Boolean active;
}