package com.shop.features.banner.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shop.common.exception.BadRequestException;
import com.shop.features.banner.dto.BannerRequestDto;
import com.shop.features.banner.dto.BannerResponseDto;
import com.shop.features.banner.entity.Banner;
import com.shop.features.banner.mapper.BannerMapper;
import com.shop.features.banner.repository.BannerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements BannerService {

    private final BannerRepository bannerRepository;
    private final BannerMapper bannerMapper;

    @Override
    public BannerResponseDto createBanner(BannerRequestDto request) {

        Banner banner = bannerMapper.toEntity(request);

        return bannerMapper.toResponse(
                bannerRepository.save(banner)
        );
    }

    @Override
    public BannerResponseDto updateBanner(Long id, BannerRequestDto request) {

        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Banner not found"));

        banner.setTitle(request.getTitle());
        banner.setSubtitle(request.getSubtitle());
        banner.setButtonText(request.getButtonText());
        banner.setButtonLink(request.getButtonLink());
        banner.setImageUrl(request.getImageUrl());
        banner.setDisplayOrder(request.getDisplayOrder());
        banner.setActive(request.getActive());

        return bannerMapper.toResponse(
                bannerRepository.save(banner)
        );
    }

    @Override
    public void deleteBanner(Long id) {

        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Banner not found"));

        bannerRepository.delete(banner);
    }

    @Override
    public BannerResponseDto toggleBanner(Long id) {

        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Banner not found"));

        banner.setActive(!banner.getActive());

        return bannerMapper.toResponse(
                bannerRepository.save(banner)
        );
    }

    @Override
    public BannerResponseDto getBanner(Long id) {

        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Banner not found"));

        return bannerMapper.toResponse(banner);
    }

    @Override
    public List<BannerResponseDto> getAllBanners() {

        return bannerRepository.findAll()
                .stream()
                .map(bannerMapper::toResponse)
                .toList();
    }

    @Override
    public List<BannerResponseDto> getActiveBanners() {

        return bannerRepository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(bannerMapper::toResponse)
                .toList();
    }
}