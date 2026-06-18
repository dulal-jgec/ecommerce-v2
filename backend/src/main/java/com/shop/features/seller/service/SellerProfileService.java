package com.shop.features.seller.service;

import java.util.List;

import com.shop.features.seller.dto.SellerApplicationRequestDto;
import com.shop.features.seller.dto.SellerProfileResponseDto;

public interface SellerProfileService {

    void applyForSeller(
            Long userId,
            SellerApplicationRequestDto request
    );

    void approveSeller(Long sellerProfileId);

    void rejectSeller(Long sellerProfileId);
    List<SellerProfileResponseDto>
    getPendingApplications();
}