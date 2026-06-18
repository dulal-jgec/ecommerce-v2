package com.shop.features.order.service;

import java.util.List;

import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.dto.PlaceOrderRequestDto;
import com.shop.features.order.dto.UpdateOrderStatusDto;
import com.shop.features.order.entity.UpdateOrderItemStatusDto;
import com.shop.features.seller.dto.SellerOrderResponseDto;

public interface OrderService {

    OrderResponseDto placeOrder(
            String email,
            PlaceOrderRequestDto request
    );

    List<OrderResponseDto> getMyOrders(
            String email
    );

    OrderResponseDto updateOrderStatus(
            Long orderId,
            UpdateOrderStatusDto request
    );

    List<OrderResponseDto> getAllOrders();
    
    OrderResponseDto getOrderById(
    		String email,
    		Long orderId
    		);
    OrderResponseDto getOrderForAdmin(
            Long orderId
    );
    
    List<SellerOrderResponseDto> getSellerOrders(String email);
    				
    SellerOrderResponseDto getSellerOrderDetails(
            String email,
            Long orderItemId
    );
    
    SellerOrderResponseDto updateSellerOrderStatus(
            String email,
            Long orderItemId,
            UpdateOrderItemStatusDto request
    );
    
}