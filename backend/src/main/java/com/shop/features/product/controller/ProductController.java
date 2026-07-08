package com.shop.features.product.controller;

import com.shop.common.dto.ApiResponse;
import com.shop.features.product.dto.MarketingUpdateRequestDto;
import com.shop.features.product.dto.ProductFilterDto;
import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;
import com.shop.features.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.lang.module.ModuleDescriptor.Builder;
import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    

    @PreAuthorize(
    		 "hasAnyRole('ADMIN','SELLER')"
    		)
    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(
            @Valid @RequestBody ProductRequestDto request
    ) {
        ProductResponseDto response = productService.createProduct(request);
        return ResponseEntity.ok(
        	    ApiResponse.<ProductResponseDto>builder()
        	        .success(true)
        	        .message("Product created successfully")
        	        .data(response)
        	        .build()
        	);
    }
    
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
 
        var result = productService.getAllProducts(page, size);

        return ResponseEntity.ok(
        		ApiResponse.<Page<ProductResponseDto>>builder()
        		.success(true)
        		.message("Product fetched succesfully")
        		.data(result)
        		.build()
);
    }
    
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String direction
    ) {

        ProductFilterDto filter = new ProductFilterDto();
        filter.setCategory(category);
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);

        var result = productService.getFilteredProducts(filter, page, size,sortBy,direction);

        return ResponseEntity.ok(
        		ApiResponse.<Page<ProductResponseDto>>builder()
        		.success(true)
        		.message("Filtered products fetched")
        		.data(result)
        		.build()
);
    }
    
    @PreAuthorize(
    		 "hasAnyRole('ADMIN','SELLER')"
    		)
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDto request
    ) {

        ProductResponseDto response =
                productService.updateProduct(id, request);

        return ResponseEntity.ok(
                ApiResponse.<ProductResponseDto>builder()
                        .success(true)
                        .message("Product updated successfully")
                        .data(response)
                        .build()
        );
    }
    
    @PreAuthorize(
    		 "hasAnyRole('ADMIN','SELLER')"
    		)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(
            @PathVariable Long id
    ) {

        productService.deleteProduct(id);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Product deleted successfully")
                        .data("Deleted")
                        .build()
        );
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDto>> getProductById(
            @PathVariable Long id
    ) {

        ProductResponseDto response =
                productService.getProductById(id);

        return ResponseEntity.ok(
                ApiResponse.<ProductResponseDto>builder()
                        .success(true)
                        .message("Product fetched successfully")
                        .data(response)
                        .build()
        );
    }
    
    @GetMapping("/my-products")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<?>myProducts(){
    	return ResponseEntity.ok(
    			productService
    			.getMyProducts()
    			);
    }
    
    
    @GetMapping("/featured")
    public ResponseEntity<?> getFeaturedProducts() {

        return ResponseEntity.ok(
                productService.getFeaturedProducts()
        );
    }
    
    @GetMapping("/new-arrivals")
    public ResponseEntity<?> getNewArrivalProducts() {

        return ResponseEntity.ok(
                productService.getNewArrivalProducts()
        );
    }
    
    @GetMapping("/best-sellers")
    public ResponseEntity<?> getBestSellerProducts() {

        return ResponseEntity.ok(
                productService.getBestSellerProducts()
        );
    }
    
    @GetMapping("/trending")
    public ResponseEntity<?> getTrendingProducts() {

        return ResponseEntity.ok(
                productService.getTrendingProducts()
        );
    }
    
    @PatchMapping("/{id}/marketing")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductResponseDto>> updateMarketing(
            @PathVariable Long id,
            @RequestBody MarketingUpdateRequestDto request
    ) {

        ProductResponseDto response =
                productService.updateMarketing(id, request);

        return ResponseEntity.ok(
                ApiResponse.<ProductResponseDto>builder()
                        .success(true)
                        .message("Marketing updated successfully")
                        .data(response)
                        .build()
        );
    }
    
}