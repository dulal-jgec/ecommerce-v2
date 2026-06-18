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
	        product.setCategory(dto.getCategory());
	        product.setColor(dto.getColor());
	        product.setSize(dto.getSize());

	        return product;
	    }
	
	public static ProductResponseDto toResponse(Product product) {

	    return ProductResponseDto.builder()
	            .id(product.getId())
	            .name(product.getName())
	            .description(product.getDescription())
	            .price(product.getPrice())
	            .stock(product.getStock())
	            .category(product.getCategory())
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
	
	
	}
