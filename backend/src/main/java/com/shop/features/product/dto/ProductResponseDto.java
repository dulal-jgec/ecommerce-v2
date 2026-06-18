package com.shop.features.product.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Builder
public class ProductResponseDto {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String category;
    private String color;
    private String size;
    private List<ProductImageResponseDto> images;
    private Boolean featured;

    private Boolean newArrival;

    private Boolean bestSeller;

    private Boolean trending;
    
    private Long sellerId;
    private String sellerEmail;
    
}