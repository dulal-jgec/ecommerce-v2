package com.shop.features.product.mapper;

import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;
import com.shop.features.product.entity.Product;
import java.util.stream.Collectors;
import com.shop.features.product.dto.ProductImageResponseDto;


public class ProductMapper {

	// DTO -> Entity
	
	public static Product toEntity(ProductRequestDto dto) {
		Product product = new Product();
		
		 product.setName(dto.getName());
	        product.setDescription(dto.getDescription());
	        product.setPrice(dto.getPrice());
	        product.setStock(dto.getStock());
 	        product.setColor(dto.getColor());
	        product.setSize(dto.getSize());

	        return product;
	    }
	
	public static ProductResponseDto toResponse(Product product) {

	    return ProductResponseDto.builder()
	            .id(product.getId())
	            .name(product.getName())
	            .description(product.getDescription())
	            .originalPrice(product.getOriginalPrice())
	            .discount(calculateDiscount(product))
	            .averageRating(0.0)
	            .totalReviews(0)
	            .price(product.getPrice())
	            .stock(product.getStock())
	            .categoryId(
	            	    product.getCategory() != null
	            	        ? product.getCategory().getId()
	            	        : null
	            	)
	            	.categoryName(
	            	    product.getCategory() != null
	            	        ? product.getCategory().getName()
	            	        : null
	            	)
	            .color(product.getColor())
	            .size(product.getSize())
	            .featured(product.getFeatured())
	            .newArrival(product.getNewArrival())
	            .bestSeller(product.getBestSeller())
	            .trending(product.getTrending())

	            .images(
	                    product.getImages()
	                            .stream()
	                            .map(image -> ProductImageResponseDto.builder()
	                                    .id(image.getId())
	                                    .color(image.getColor())
	                                    .imageUrl(image.getImageUrl())
	                                    .build())
	                            .collect(Collectors.toList())
	            )
	            .sellerId(
	            		product.getSeller()!=null
	            		? product.getSeller().getId()
	            				:null
	            		)
	            .sellerEmail(
	            		product.getSeller()!=null
	            		?product.getSeller().getEmail()
	            				:null
	            		)
	            

	            .build();
	    
	    
	    }
	private static Integer calculateDiscount(Product product) {

	    if (product.getOriginalPrice() == null
	            || product.getOriginalPrice().doubleValue() == 0) {

	        return 0;
	    }

	    return (int) (
	            (product.getOriginalPrice().doubleValue()
	                    - product.getPrice().doubleValue())
	                    * 100
	                    / product.getOriginalPrice().doubleValue()
	    );
	}
	
	
	}
