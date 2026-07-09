package com.shop.features.banner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.banner.entity.Banner;

public interface BannerRepository extends JpaRepository<Banner, Long> {

    List<Banner> findByActiveTrueOrderByDisplayOrderAsc();

}