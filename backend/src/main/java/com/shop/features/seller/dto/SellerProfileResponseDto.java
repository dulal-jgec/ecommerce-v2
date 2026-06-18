package com.shop.features.seller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SellerProfileResponseDto {

    private Long id;

    private String email;

    private String shopName;

    private String description;

    private String status;
}