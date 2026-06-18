package com.shop.features.payment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePaymentRequestDto {
		@NotNull
		private Long orderId; 		
}
