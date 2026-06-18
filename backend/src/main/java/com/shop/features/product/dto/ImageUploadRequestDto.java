package com.shop.features.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageUploadRequestDto {

    @NotBlank
    private String color;
}