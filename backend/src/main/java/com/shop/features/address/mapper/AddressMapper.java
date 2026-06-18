package com.shop.features.address.mapper;

import com.shop.features.address.dto.AddressRequestDto;
import com.shop.features.address.dto.AddressResponseDto;
import com.shop.features.address.entity.Address;

public class AddressMapper {

    private AddressMapper() {}

    public static Address toEntity(AddressRequestDto dto) {

        Address address = new Address();

        address.setFullName(dto.getFullName());
        address.setPhoneNumber(dto.getPhoneNumber());
        address.setAddressLine1(dto.getAddressLine1());
        address.setAddressLine2(dto.getAddressLine2());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPostalCode(dto.getPostalCode());
        address.setCountry(dto.getCountry());

        if (dto.getDefaultAddress() != null) {
            address.setDefaultAddress(dto.getDefaultAddress());
        }

        return address;
    }

    public static AddressResponseDto toResponse(Address address) {

        return AddressResponseDto.builder()
                .id(address.getId())
                .fullName(address.getFullName())
                .phoneNumber(address.getPhoneNumber())
                .addressLine1(address.getAddressLine1())
                .addressLine2(address.getAddressLine2())
                .city(address.getCity())
                .state(address.getState())
                .postalCode(address.getPostalCode())
                .country(address.getCountry())
                .defaultAddress(address.getDefaultAddress())
                .build();
    }
}