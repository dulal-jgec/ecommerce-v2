package com.shop.features.product.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductVariantResponseDto {

    private Long id;

    private String color;

    private String size;

    private BigDecimal price;

    private Integer stock;

    private String sku;
}