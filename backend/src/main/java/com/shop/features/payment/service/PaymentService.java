package com.shop.features.payment.service;

import com.shop.features.payment.dto.CreatePaymentRequestDto;
import com.shop.features.payment.dto.CreatePaymentResponseDto;
import com.shop.features.payment.dto.VerifyPaymentRequestDto;

public interface PaymentService {
			
	CreatePaymentResponseDto createPayment(
			String email, 
			CreatePaymentRequestDto request
			);
	boolean verifyPayment(
			VerifyPaymentRequestDto request
			);
}
