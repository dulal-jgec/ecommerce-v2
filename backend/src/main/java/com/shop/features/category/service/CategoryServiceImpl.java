package com.shop.features.category.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shop.common.exception.BadRequestException;
import com.shop.features.category.dto.CategoryRequestDto;
import com.shop.features.category.dto.CategoryResponseDto;
import com.shop.features.category.entity.Category;
import com.shop.features.category.mapper.CategoryMapper;
import com.shop.features.category.repository.CategoryRepository;
import com.shop.features.product.service.CloudinaryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public CategoryResponseDto createCategory(
            CategoryRequestDto request,
            MultipartFile image
    ) {

        if (image == null || image.isEmpty()) {
            throw new BadRequestException("Category image is required");
        }

        String imageUrl = cloudinaryService.uploadFile(image);

        Category category = new Category();

        category.setName(request.getName());
        category.setImageUrl(imageUrl);

        Category saved = categoryRepository.save(category);

        return CategoryMapper.toResponse(saved);
    }

    @Override
    public List<CategoryResponseDto> getAllCategories() {

        return categoryRepository.findByActiveTrue()
                .stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }
}