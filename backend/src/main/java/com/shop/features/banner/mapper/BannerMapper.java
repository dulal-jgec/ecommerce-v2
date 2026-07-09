package com.shop.features.banner.mapper;

import org.springframework.stereotype.Component;

import com.shop.features.banner.dto.BannerRequestDto;
import com.shop.features.banner.dto.BannerResponseDto;
import com.shop.features.banner.entity.Banner;

@Component
public class BannerMapper {

    public Banner toEntity(BannerRequestDto dto) {

        return Banner.builder()
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .buttonText(dto.getButtonText())
                .buttonLink(dto.getButtonLink())
                .imageUrl(dto.getImageUrl())
                .displayOrder(dto.getDisplayOrder())
                .active(dto.getActive())
                .build();
    }

    public BannerResponseDto toResponse(Banner banner) {

        return BannerResponseDto.builder()
                .id(banner.getId())
                .title(banner.getTitle())
                .subtitle(banner.getSubtitle())
                .buttonText(banner.getButtonText())
                .buttonLink(banner.getButtonLink())
                .imageUrl(banner.getImageUrl())
                .displayOrder(banner.getDisplayOrder())
                .active(banner.getActive())
                .createdAt(banner.getCreatedAt())
                .build();
    }
}