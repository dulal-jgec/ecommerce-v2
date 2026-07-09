package com.shop.features.banner.service;

import java.util.List;

import com.shop.features.banner.dto.BannerRequestDto;
import com.shop.features.banner.dto.BannerResponseDto;

public interface BannerService {

    BannerResponseDto createBanner(BannerRequestDto request);

    BannerResponseDto updateBanner(Long id, BannerRequestDto request);

    void deleteBanner(Long id);

    BannerResponseDto toggleBanner(Long id);

    BannerResponseDto getBanner(Long id);

    List<BannerResponseDto> getAllBanners();

    List<BannerResponseDto> getActiveBanners();
}