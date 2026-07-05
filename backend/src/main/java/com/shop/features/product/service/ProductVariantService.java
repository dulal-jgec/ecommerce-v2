package com.shop.features.product.service;

import com.shop.features.product.dto.ProductVariantRequestDto;
import com.shop.features.product.dto.ProductVariantResponseDto;

import java.util.List;

public interface ProductVariantService {

    ProductVariantResponseDto addVariant(
            Long productId,
            ProductVariantRequestDto request
    );

    List<ProductVariantResponseDto> getVariants(
            Long productId
    );
}