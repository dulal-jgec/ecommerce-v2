package com.shop.features.seller.service;

import com.shop.features.seller.dto.SellerApplicationRequestDto;
import com.shop.features.seller.dto.SellerProfileResponseDto;
import com.shop.features.seller.entity.SellerProfile;
import com.shop.features.seller.entity.SellerStatus;
import com.shop.features.seller.repository.SellerProfileRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.entity.UserRole;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerProfileServiceImpl
        implements SellerProfileService {

    private final SellerProfileRepository sellerProfileRepository;
    private final UserRepository userRepository;

    @Override
    public void applyForSeller(
            Long userId,
            SellerApplicationRequestDto request
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        SellerProfile profile = new SellerProfile();

        profile.setUser(user);
        profile.setShopName(request.getShopName());
        profile.setDescription(request.getDescription());
        profile.setLogo(request.getLogo());

        profile.setStatus(
                SellerStatus.PENDING
        );

        sellerProfileRepository.save(profile);
    }

    @Override
    public void approveSeller(Long sellerProfileId) {

        SellerProfile profile =
                sellerProfileRepository.findById(sellerProfileId)
                        .orElseThrow();

        profile.setStatus(
                SellerStatus.APPROVED
        );
        User user = profile.getUser();
        user.setRole(
        		UserRole.SELLER
        		);
        userRepository.save(user);

        sellerProfileRepository.save(profile);
    }

    @Override
    public void rejectSeller(Long sellerProfileId) {

        SellerProfile profile =
                sellerProfileRepository.findById(sellerProfileId)
                        .orElseThrow();

        profile.setStatus(
                SellerStatus.REJECTED
        );

        sellerProfileRepository.save(profile);
    }
    
    @Override
    public List<SellerProfileResponseDto>
    getPendingApplications() {

        return sellerProfileRepository
                .findByStatus(
                        SellerStatus.PENDING
                )
                .stream()
                .map(profile ->
                        SellerProfileResponseDto.builder()
                                .id(profile.getId())
                                .email(profile.getUser().getEmail())
                                .shopName(profile.getShopName())
                                .description(profile.getDescription())
                                .status(
                                        profile.getStatus().name()
                                )
                                .build()
                )
                .toList();
    }
    public List<SellerProfileResponseDto> getAllSellers() {

        return sellerProfileRepository.findAll()
                .stream()
                .map(profile ->
                        SellerProfileResponseDto.builder()
                                .id(profile.getId())
                                .email(profile.getUser().getEmail())
                                .shopName(profile.getShopName())
                                .description(profile.getDescription())
                                .status(profile.getStatus().name())
                                .firstName(profile.getUser().getFirstName())
                                .lastName(profile.getUser().getLastName())
                                .phoneNumber(profile.getUser().getPhoneNumber())
                                .appliedAt(profile.getAppliedAt())
                                .build())
                .toList();
    }
    
    
}