package com.shop.features.address.service;

import java.util.List;

import com.shop.features.address.dto.AddressRequestDto;
import com.shop.features.address.dto.AddressResponseDto;

public interface AddressService {

    AddressResponseDto createAddress(
            String email,
            AddressRequestDto request
    );

    List<AddressResponseDto> getMyAddresses(
            String email
    );
    AddressResponseDto updateAddress(
            String email,
            Long addressId,
            AddressRequestDto request
    );

    void deleteAddress(
            String email,
            Long addressId
    );

    AddressResponseDto setDefaultAddress(
            String email,
            Long addressId
    );
}