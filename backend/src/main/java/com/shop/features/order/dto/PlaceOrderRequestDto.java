package com.shop.features.order.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderRequestDto {

    @NotNull
    private Long addressId;
}