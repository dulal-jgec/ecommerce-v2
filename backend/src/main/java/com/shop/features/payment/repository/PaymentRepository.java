package com.shop.features.payment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
	Optional<Payment> findByRazorpayOrderId(
			String razorpayOrderId
			);

}
