package com.shop.features.product.service;

import com.shop.features.product.dto.ProductImageResponseDto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ProductImageService {

    ProductImageResponseDto uploadImage(
            Long productId,
            String color,
            MultipartFile file
    );
    void deleteImage(Long imageId);
    void uploadMultipleImages(
            Long productId,
            List<String> colors,
            List<MultipartFile> files
    );
    ProductImageResponseDto setMainImage(Long imageId);
    
}