package com.shop.features.payment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class CreatePaymentResponseDto {
		
	private String razorpayOrderId;
	
	private String key;
	
	private Long paymentId; 
	
}
