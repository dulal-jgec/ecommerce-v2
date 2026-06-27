package com.shop.features.category.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.shop.features.category.dto.CategoryRequestDto;
import com.shop.features.category.dto.CategoryResponseDto;

public interface CategoryService {

    CategoryResponseDto createCategory(
            CategoryRequestDto request,
            MultipartFile image
    );

    List<CategoryResponseDto> getAllCategories();
}