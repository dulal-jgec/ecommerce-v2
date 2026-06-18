package com.shop.features.seller.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SellerOrderResponseDto {

    private Long orderId;

    private Long orderItemId;

    private String productName;

    private String color;

    private Integer quantity;

    private BigDecimal price;

    private String imageUrl;

    private String customerName;

    private String customerPhone;

    private String address;

    private String status;
}