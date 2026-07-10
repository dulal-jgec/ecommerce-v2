package com.shop.features.banner.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shop.common.dto.ApiResponse;
import com.shop.features.banner.dto.BannerRequestDto;
import com.shop.features.banner.dto.BannerResponseDto;
import com.shop.features.banner.service.BannerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

     

    @GetMapping
    public ResponseEntity<ApiResponse<List<BannerResponseDto>>> getActiveBanners() {

        return ResponseEntity.ok(
                ApiResponse.<List<BannerResponseDto>>builder()
                        .success(true)
                        .message("Active banners fetched successfully")
                        .data(bannerService.getActiveBanners())
                        .build()
        );
    }

     

    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<BannerResponseDto>>> getAllBanners() {

        return ResponseEntity.ok(
                ApiResponse.<List<BannerResponseDto>>builder()
                        .success(true)
                        .message("All banners fetched successfully")
                        .data(bannerService.getAllBanners())
                        .build()
        );
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<ApiResponse<BannerResponseDto>> getBanner(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<BannerResponseDto>builder()
                        .success(true)
                        .message("Banner fetched successfully")
                        .data(bannerService.getBanner(id))
                        .build()
        );
    }

    @PostMapping("/admin")
    public ResponseEntity<ApiResponse<BannerResponseDto>> createBanner(
            @Valid @RequestBody BannerRequestDto request) {

        return ResponseEntity.ok(
                ApiResponse.<BannerResponseDto>builder()
                        .success(true)
                        .message("Banner created successfully")
                        .data(bannerService.createBanner(request))
                        .build()
        );
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<ApiResponse<BannerResponseDto>> updateBanner(
            @PathVariable Long id,
            @Valid @RequestBody BannerRequestDto request) {

        return ResponseEntity.ok(
                ApiResponse.<BannerResponseDto>builder()
                        .success(true)
                        .message("Banner updated successfully")
                        .data(bannerService.updateBanner(id, request))
                        .build()
        );
    }

    @PatchMapping("/admin/{id}/toggle")
    public ResponseEntity<ApiResponse<BannerResponseDto>> toggleBanner(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<BannerResponseDto>builder()
                        .success(true)
                        .message("Banner status updated")
                        .data(bannerService.toggleBanner(id))
                        .build()
        );
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<ApiResponse<?>> deleteBanner(
            @PathVariable Long id) {

        bannerService.deleteBanner(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Banner deleted successfully")
                        .build()
        );
    }
}