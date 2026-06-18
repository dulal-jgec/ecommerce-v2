package com.shop.features.product.controller;

import com.shop.common.dto.ApiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import com.shop.features.product.dto.ProductImageResponseDto;
import com.shop.features.product.service.ProductImageService;

import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductImageService productImageService;

    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    @PostMapping(
            value = "/{productId}/images",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<?>> uploadImage(

            @PathVariable Long productId,

            @RequestParam("color")
            @NotBlank String color,

            @RequestPart("file")
            MultipartFile file
    ) {

        ProductImageResponseDto response =
                productImageService.uploadImage(
                        productId,
                        color,
                        file
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Image uploaded successfully")
                        .data(response)
                        .build()
        );
    }
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<ApiResponse<?>> deleteImage(
            @PathVariable Long imageId
    ) {

        productImageService.deleteImage(imageId);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Image deleted successfully")
                        .build()
        );
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    @PostMapping(
            value = "/{productId}/images/batch",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<String>> uploadMultipleImages(

            @PathVariable Long productId,

            @RequestParam List<String> colors,

            @RequestPart List<MultipartFile> files
    ) {

        productImageService.uploadMultipleImages(
                productId,
                colors,
                files
        );

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Images uploaded successfully")
                        .data("Uploaded")
                        .build()
        );
    }
}