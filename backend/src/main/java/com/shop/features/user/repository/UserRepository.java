package com.shop.features.user.repository;

import com.shop.features.user.entity.User;
import com.shop.features.user.entity.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(UserRole role);

    List<User> findByEnabled(boolean enabled);

    List<User> findByRoleAndEnabled(UserRole role, boolean enabled);

    Page<User> findByRole(UserRole role, Pageable pageable);
}