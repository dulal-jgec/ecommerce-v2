package com.shop.features.address.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.address.entity.Address;

public interface AddressRepository
        extends JpaRepository<Address, Long> {

    List<Address> findByUserId(Long userId);

    Optional<Address> findByIdAndUserId(
            Long addressId,
            Long userId
    );

    Optional<Address> findByUserIdAndDefaultAddressTrue(
            Long userId
    );
}