package com.shop.features.category.mapper;

import com.shop.features.category.dto.CategoryResponseDto;
import com.shop.features.category.entity.Category;


public class CategoryMapper {

    private CategoryMapper() {
    }

    public static CategoryResponseDto toResponse(Category category) {

        return CategoryResponseDto.builder()
                .id(category.getId())
                .name(category.getName())
                .imageUrl(category.getImageUrl())
                .active(category.getActive())
                .build();
    }
}