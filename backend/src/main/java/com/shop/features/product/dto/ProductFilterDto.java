package com.shop.features.product.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductFilterDto {

    private String category;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}