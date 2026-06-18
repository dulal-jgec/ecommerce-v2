package com.shop.features.product.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileValidationService {

    void validateImage(MultipartFile file);
}