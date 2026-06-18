package com.shop.features.product.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductImageResponseDto {

    private Long id;
    private String color;
    private String imageUrl;
}