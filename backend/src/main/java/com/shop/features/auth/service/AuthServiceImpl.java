package com.shop.features.auth.service;

import java.time.LocalDateTime;
import com.shop.features.cart.entity.Cart;
import com.shop.features.cart.repository.CartRepository;
import com.shop.features.seller.entity.SellerProfile;
import com.shop.features.seller.entity.SellerStatus;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shop.common.exception.BadRequestException;
import com.shop.config.JwtService;
import com.shop.config.OpenApiConfig;
import com.shop.features.auth.dto.AuthResponseDto;
import com.shop.features.auth.dto.LoginRequestDto;
import com.shop.features.auth.dto.RegisterRequestDto;
import com.shop.features.auth.entity.RefreshToken;
import com.shop.features.auth.repository.RefreshTokenRepository;
import com.shop.features.seller.repository.SellerProfileRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.shop.features.user.entity.UserRole;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

 
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    
    private final SellerProfileRepository sellerProfileRepository;
    private final CartRepository cartRepository;

    @Override
    public void register(RegisterRequestDto request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.BUYER);

        
        
        User savedUser = userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(savedUser);

        cartRepository.save(cart);
    
        if("SELLER".equalsIgnoreCase(request.getRole())) {

            SellerProfile profile =
                    new SellerProfile();

            profile.setUser(savedUser);

            profile.setShopName(
            	    request.getShopName()
            	);

            	profile.setDescription(
            	    request.getDescription()
            	);

            	profile.setLogo(
            	    request.getLogo()
            	);

            profile.setStatus(
                    SellerStatus.PENDING
            );

            sellerProfileRepository.save(profile);
        }
            }

    @Transactional
    @Override
    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        String accessToken = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        // Delete old refresh token if exists
        refreshTokenRepository.findByUser(user)
                .ifPresent(refreshTokenRepository::delete);

        // Create new refresh token
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(LocalDateTime.now().plusDays(7));

        refreshTokenRepository.save(refreshToken);

        return AuthResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build(); 
    }

    @Override
    public AuthResponseDto refreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));

        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Refresh token expired");
        }

        User user = refreshToken.getUser();

        String newAccessToken = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name() 
        );

        return AuthResponseDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(token)
                .build();
    }

    @Override
    public void logout(String token) {

        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid token"));

        refreshTokenRepository.delete(refreshToken);
    }
}