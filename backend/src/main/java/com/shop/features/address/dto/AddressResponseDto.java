package com.shop.features.address.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AddressResponseDto {

    private Long id;

    private String fullName;

    private String phoneNumber;

    private String addressLine1;

    private String addressLine2;

    private String city;

    private String state;

    private String postalCode;

    private String country;

    private Boolean defaultAddress;
}