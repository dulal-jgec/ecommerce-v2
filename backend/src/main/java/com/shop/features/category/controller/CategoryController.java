package com.shop.features.category.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.common.dto.ApiResponse;
import com.shop.features.category.dto.CategoryRequestDto;
import com.shop.features.category.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

 
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<?>> createCategory(

            @RequestPart("category") String categoryJson,

            @RequestPart("image") MultipartFile image

    ) throws Exception {

    	ObjectMapper objectMapper = new ObjectMapper();

    	CategoryRequestDto request =
    	        objectMapper.readValue(
    	                categoryJson,
    	                CategoryRequestDto.class
    	        );

        var response =
                categoryService.createCategory(
                        request,
                        image
                );

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Category created successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllCategories() {

        var response =
                categoryService.getAllCategories();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Categories fetched successfully")
                        .data(response)
                        .build()
        );
    }
}