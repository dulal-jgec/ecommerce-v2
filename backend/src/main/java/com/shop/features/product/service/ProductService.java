package com.shop.features.product.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.shop.features.product.dto.ProductFilterDto;
import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;


public interface ProductService {

    ProductResponseDto createProduct(ProductRequestDto request);

    Page<ProductResponseDto> getAllProducts(int page, int size);

    Page<ProductResponseDto> getFilteredProducts(
            ProductFilterDto filter,
            int page,
            int size,
            String sortBy,
            String direction
    );
    ProductResponseDto updateProduct(
            Long productId,
            ProductRequestDto request
    );
    void deleteProduct(Long productId);
    ProductResponseDto getProductById(Long id);
    
    List<ProductResponseDto> getFeaturedProducts();

    List<ProductResponseDto> getNewArrivalProducts();

    List<ProductResponseDto> getBestSellerProducts();

    List<ProductResponseDto> getTrendingProducts();
    
    List<ProductResponseDto> getMyProducts();
}