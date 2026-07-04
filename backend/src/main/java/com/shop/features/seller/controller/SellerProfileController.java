package com.shop.features.seller.controller;

import com.shop.features.seller.dto.SellerApplicationRequestDto;
import com.shop.features.seller.dto.SellerProfileResponseDto;
import com.shop.features.seller.service.SellerProfileService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/seller")
@RequiredArgsConstructor
public class SellerProfileController {

    private final SellerProfileService sellerProfileService;

   
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pending")
    public List<SellerProfileResponseDto>
    getPendingApplications() {

        return sellerProfileService
                .getPendingApplications();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/approve")
    public void approveSeller(
            @PathVariable Long id
    ) {
        sellerProfileService
                .approveSeller(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/reject")
    public void rejectSeller(
            @PathVariable Long id
    ) {
        sellerProfileService
                .rejectSeller(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<SellerProfileResponseDto> getAllSellers() {
        return sellerProfileService.getAllSellers();
    }
}