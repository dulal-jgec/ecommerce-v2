package com.shop.features.seller.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SellerProfileResponseDto { private Long id;

private String firstName;

private String lastName;

private String email;

private String phoneNumber;

private String shopName;

private String description;

private String logo;

private String status;

private LocalDateTime appliedAt;
private String role;
}