package com.shop.features.order.mapper;

import java.util.List;

import com.shop.features.order.dto.OrderItemResponseDto;
import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.entity.Order;
import com.shop.features.order.entity.OrderItem;
import com.shop.features.order.entity.OrderItemStatus;
import com.shop.features.seller.dto.SellerOrderResponseDto;

public class OrderMapper {

    private OrderMapper() {
    }

    public static OrderResponseDto toResponseDto(Order order) {

        List<OrderItemResponseDto> items = order.getItems()
                .stream()
                .map(item -> {

                    String imageUrl = item.getProduct()
                            .getImages()
                            .stream()
                            .filter(img ->
                                    img.getColor()
                                            .equalsIgnoreCase(item.getColor()))
                            .findFirst()
                            .map(img -> img.getImageUrl())
                            .orElse(null);

                    return OrderItemResponseDto.builder()
                            .productId(item.getProduct().getId())
                            .productName(item.getProduct().getName())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .color(item.getColor())
                            .imageUrl(imageUrl)
                            .status(item.getStatus())
                            .build();
                })
                .toList();

        return OrderResponseDto.builder()
                .orderId(order.getId())
                .items(items)
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .currentStatus(getCurrentStatus(order))
                .createdAt(order.getCreatedAt())

                // Shipping Snapshot
                .shippingFullName(order.getShippingFullName())
                .shippingPhoneNumber(order.getShippingPhoneNumber())
                .shippingAddressLine1(order.getShippingAddressLine1())
                .shippingAddressLine2(order.getShippingAddressLine2())
                .shippingCity(order.getShippingCity())
                .shippingState(order.getShippingState())
                .shippingPostalCode(order.getShippingPostalCode())
                .shippingCountry(order.getShippingCountry())

                .build();
    }

    public static SellerOrderResponseDto toSellerResponseDto(OrderItem item) {

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

    private static OrderItemStatus getCurrentStatus(Order order) {

        List<OrderItem> items = order.getItems();

        if (items.isEmpty()) {
            return OrderItemStatus.PLACED;
        }

        if (items.stream().allMatch(i -> i.getStatus() == OrderItemStatus.CANCELLED)) {
            return OrderItemStatus.CANCELLED;
        }

        if (items.stream().anyMatch(i -> i.getStatus() == OrderItemStatus.DELIVERED)) {
            return OrderItemStatus.DELIVERED;
        }

        if (items.stream().anyMatch(i -> i.getStatus() == OrderItemStatus.SHIPPED)) {
            return OrderItemStatus.SHIPPED;
        }

        if (items.stream().anyMatch(i -> i.getStatus() == OrderItemStatus.PAID)) {
            return OrderItemStatus.PAID;
        }

        return OrderItemStatus.PLACED;
    }
}