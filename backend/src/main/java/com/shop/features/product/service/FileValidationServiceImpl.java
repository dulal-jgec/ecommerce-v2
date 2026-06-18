package com.shop.features.product.service;

import com.shop.common.exception.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class FileValidationServiceImpl implements FileValidationService {

    private static final long MAX_SIZE = 5 * 1024 * 1024;

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    @Override
    public void validateImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Image is required");
        }

        if (file.getSize() > MAX_SIZE) {
            throw new BadRequestException("Maximum image size is 5MB");
        }

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new BadRequestException(
                    "Only JPG, PNG and WEBP files are allowed"
            );
        }
    }
}