package com.shop.features.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.order.entity.Order;

public interface OrderRepository extends JpaRepository<Order,Long>{
		List<Order>findByUserId(Long userId);
}
