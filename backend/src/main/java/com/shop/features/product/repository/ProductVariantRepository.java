package com.shop.features.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.product.entity.ProductVariant;

public interface ProductVariantRepository
        extends JpaRepository<ProductVariant, Long> {

    List<ProductVariant> findByProductId(Long productId);
}