package com.shop.features.product.dto;

import lombok.Data;

@Data
public class MarketingUpdateRequestDto {
	private Boolean featured;
	private Boolean trending;
	private Boolean bestSeller;
	private Boolean newArrival;
}
