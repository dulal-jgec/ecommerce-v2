package com.shop.features.order.mapper;

import java.util.List;

import com.shop.features.order.dto.OrderItemResponseDto;
import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.entity.Order;
import com.shop.features.order.entity.OrderItem;
import com.shop.features.seller.dto.SellerOrderResponseDto;

public class OrderMapper {

    private OrderMapper() {}

    public static OrderResponseDto toResponseDto(Order order) {

        List<OrderItemResponseDto> items =
                order.getItems()
                        .stream()
                        .map(item ->
                                OrderItemResponseDto.builder()
                                        .productName(item.getProduct().getName())
                                        .quantity(item.getQuantity())
                                        .price(item.getPrice())
                                        .status(item.getStatus())
                                        .build()
                        )
                        .toList();

        return OrderResponseDto.builder()
                .orderId(order.getId())
                .items(items)
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                

                // Shipping Snapshot

                .shippingFullName(
                        order.getShippingFullName()
                )

                .shippingPhoneNumber(
                        order.getShippingPhoneNumber()
                )

                .shippingAddressLine1(
                        order.getShippingAddressLine1()
                )

                .shippingAddressLine2(
                        order.getShippingAddressLine2()
                )

                .shippingCity(
                        order.getShippingCity()
                )

                .shippingState(
                        order.getShippingState()
                )

                .shippingPostalCode(
                        order.getShippingPostalCode()
                )

                .shippingCountry(
                        order.getShippingCountry()
                )

                .build();
    }
    
    public static SellerOrderResponseDto toSellerResponseDto(
            OrderItem item
    ) {

        String imageUrl = item.getProduct()
                .getImages()
                .stream()
                .filter(img ->
                        img.getColor()
                                .equalsIgnoreCase(item.getColor()))
                .findFirst()
                .map(img -> img.getImageUrl())
                .orElse(null);

        return SellerOrderResponseDto.builder()
                .orderId(item.getOrder().getId())
                .orderItemId(item.getId())
                .productName(item.getProduct().getName())
                .imageUrl(imageUrl)
                .color(item.getColor())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .customerName(item.getOrder().getShippingFullName())
                .customerPhone(item.getOrder().getShippingPhoneNumber())
                .address(item.getOrder().getShippingAddressLine1())
                .status(item.getStatus().name())
                .build();
    }
}