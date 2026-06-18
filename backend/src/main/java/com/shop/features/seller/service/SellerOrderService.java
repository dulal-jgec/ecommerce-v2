package com.shop.features.seller.service;

import java.util.List;

import com.shop.features.seller.dto.SellerOrderResponseDto;

public interface SellerOrderService {

    List<SellerOrderResponseDto> getMyOrders(String email);

}