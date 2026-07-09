package com.shop.features.banner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BannerRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String subtitle;

    private String buttonText;

    private String buttonLink;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    private Boolean active = true;
}