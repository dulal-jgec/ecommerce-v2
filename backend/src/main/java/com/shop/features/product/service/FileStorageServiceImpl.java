package com.shop.features.product.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String saveFile(MultipartFile file) {

        try {

            String originalName = file.getOriginalFilename();

            String extension =
                    originalName.substring(originalName.lastIndexOf("."));

            String fileName =
                    UUID.randomUUID() + extension;

            Path path =
                    Paths.get(uploadDir, fileName);

            Files.createDirectories(path.getParent());

            Files.copy(file.getInputStream(), path);

            return "/uploads/products/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed");
        }
    }
}