package com.shop.features.product.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.shop.common.exception.BadRequestException;
import com.shop.features.product.dto.ProductVariantRequestDto;
import com.shop.features.product.dto.ProductVariantResponseDto;
import com.shop.features.product.entity.Product;
import com.shop.features.product.entity.ProductVariant;
import com.shop.features.product.repository.ProductRepository;
import com.shop.features.product.repository.ProductVariantRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final UserRepository userRepository;

    @Override
    public ProductVariantResponseDto addVariant(
            Long productId,
            ProductVariantRequestDto request
    ) {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User seller =
                userRepository
                        .findByEmail(auth.getName())
                        .orElseThrow();

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow();

        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new BadRequestException(
                    "You can manage only your own products"
            );
        }

        ProductVariant variant = new ProductVariant();

        variant.setColor(request.getColor());
        variant.setSize(request.getSize());
        variant.setPrice(request.getPrice());
        variant.setStock(request.getStock());

        String sku =
                "SKU-"
                        + product.getId()
                        + "-"
                        + request.getColor().toUpperCase()
                        + "-"
                        + request.getSize().toUpperCase();

        variant.setSku(sku);

        variant.setProduct(product);

        ProductVariant saved =
                variantRepository.save(variant);

        return ProductVariantResponseDto.builder()
                .id(saved.getId())
                .color(saved.getColor())
                .size(saved.getSize())
                .price(saved.getPrice())
                .stock(saved.getStock())
                .sku(saved.getSku())
                .build();
    }

    @Override
    public List<ProductVariantResponseDto> getVariants(Long productId) {

        return variantRepository
                .findByProductId(productId)
                .stream()
                .map(v ->
                        ProductVariantResponseDto.builder()
                                .id(v.getId())
                                .color(v.getColor())
                                .size(v.getSize())
                                .price(v.getPrice())
                                .stock(v.getStock())
                                .sku(v.getSku())
                                .build()
                )
                .toList();
    }
}