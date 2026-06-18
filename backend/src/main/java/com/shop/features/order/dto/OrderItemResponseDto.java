package com.shop.features.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

import com.shop.features.order.entity.OrderItemStatus;

@Getter
@Builder
public class OrderItemResponseDto {
		
	 private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;
    private String color;
    private OrderItemStatus status;
    
}