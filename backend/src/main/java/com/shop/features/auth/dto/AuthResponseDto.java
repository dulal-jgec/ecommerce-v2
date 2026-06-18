package com.shop.features.auth.dto;

import lombok.Builder;


import lombok.Getter;
import lombok.Setter;
@Builder
@Getter
@Setter
public class AuthResponseDto {

    private String accessToken;
    private String refreshToken;

    private String email;
    private String role;
}