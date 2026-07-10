package com.shop.features.order.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.shop.features.order.entity.OrderItemStatus;
import com.shop.features.order.entity.OrderStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderResponseDto {

    private Long orderId;

    private List<OrderItemResponseDto> items;

    private BigDecimal totalPrice;

    private OrderStatus status;

    private LocalDateTime createdAt;

   

    private String shippingFullName;
    private String shippingPhoneNumber;
    private String shippingAddressLine1;
    private String shippingAddressLine2;
    private String shippingCity;
    private String shippingState;
    private String shippingPostalCode;
    private String shippingCountry;
    
    private OrderItemStatus currentStatus;
}