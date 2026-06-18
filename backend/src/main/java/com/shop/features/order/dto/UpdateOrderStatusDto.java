package com.shop.features.order.dto;

import com.shop.features.order.entity.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderStatusDto {
	
	private OrderStatus status;	
}
