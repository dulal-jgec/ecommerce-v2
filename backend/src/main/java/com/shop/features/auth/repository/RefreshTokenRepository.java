package com.shop.features.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.shop.features.auth.entity.RefreshToken;
import com.shop.features.user.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);
    @Query("SELECT r FROM RefreshToken r WHERE r.user = :user")

    @Transactional
    void deleteByUser(User user);
}