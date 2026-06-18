package com.shop.features.seller.repository;

import com.shop.features.seller.entity.SellerProfile;
import com.shop.features.seller.entity.SellerStatus;
import com.shop.features.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SellerProfileRepository
        extends JpaRepository<SellerProfile, Long> {

    Optional<SellerProfile> findByUser(User user);

    List<SellerProfile> findByStatus(
            SellerStatus status
    );
}