package com.shop.features.order.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.order.entity.OrderItem;
import com.shop.features.order.entity.OrderStatus;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {

    Optional<OrderItem> findFirstByOrderUserIdAndProductIdAndOrderStatus(
            Long userId,
            Long productId,
            OrderStatus status
    );

    List<OrderItem> findByProductSellerId(Long sellerId);
}