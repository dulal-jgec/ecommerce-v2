package com.shop.features.product.service;

import com.shop.common.exception.BadRequestException;
import com.shop.common.exception.ResourceNotFoundException;
import com.shop.features.product.dto.ProductImageResponseDto;
import com.shop.features.product.entity.Product;
import com.shop.features.product.entity.ProductImage;
import com.shop.features.product.repository.ProductImageRepository;
import com.shop.features.product.repository.ProductRepository;
import com.shop.features.user.entity.User;
 import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

 import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final FileStorageService fileStorageService;
    private final FileValidationService fileValidationService;

    private final UserRepository userRepository;
    
    private final CloudinaryService cloudinaryService;
    
    @Override
    public ProductImageResponseDto uploadImage(
            Long productId,
            String color,
            MultipartFile file
    ) {
    	Authentication auth =
                SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = auth.getName();

        User seller =
                userRepository
                .findByEmail(email)
                .orElseThrow();
        
        Product product=
        		productRepository.findById(productId)
        		.orElseThrow();
        
        if (!product.getSeller()
                .getId()
                .equals(seller.getId())
                && !auth.getAuthorities()
                        .contains(
                            new SimpleGrantedAuthority("ROLE_ADMIN")
                        )) {

            throw new BadRequestException(
                    "You can manage only your own products"
            );
        }
        

       
        
        

        fileValidationService.validateImage(file);

        String imageUrl = cloudinaryService.uploadFile(file);
        ProductImage image = new ProductImage();

        image.setColor(color);
        image.setImageUrl(imageUrl);
        image.setProduct(product);

        ProductImage saved =
                productImageRepository.save(image);

        return ProductImageResponseDto.builder()
                .id(saved.getId())
                .color(saved.getColor())
                .imageUrl(saved.getImageUrl())
                .build();
    }
    
    @Override
    public void deleteImage(Long imageId) {
    		
    	
    	Authentication auth =
    	        SecurityContextHolder
    	                .getContext()
    	                .getAuthentication();

    	String email = auth.getName();

    	User seller =
    	        userRepository
    	                .findByEmail(email)
    	                .orElseThrow();

    	boolean isAdmin =
    	        auth.getAuthorities()
    	                .contains(
    	                        new SimpleGrantedAuthority("ROLE_ADMIN")
    	                );
    	
        ProductImage image = productImageRepository
                .findById(imageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Image not found"
                        ));
        Product product =
                image.getProduct();
        
      
        
        
        productImageRepository.delete(image);
    }
    
    @Override
    public void uploadMultipleImages(
            Long productId,
            List<String> colors,
            List<MultipartFile> files
    ) {

        if (colors.size() != files.size()) {
            throw new RuntimeException(
                    "Colors count and files count must be same"
            );
        }
        
        Authentication auth =
                SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = auth.getName();

        User seller =
                userRepository
                .findByEmail(email)
                .orElseThrow();
        
        Product product=
        		productRepository.findById(productId)
        		.orElseThrow();
        
        if (!product.getSeller()
                .getId()
                .equals(seller.getId())
                && !auth.getAuthorities()
                        .contains(
                            new SimpleGrantedAuthority("ROLE_ADMIN")
                        )) {

            throw new BadRequestException(
                    "You can manage only your own products"
            );
        }
        

        for (int i = 0; i < files.size(); i++) {

            uploadImage(
                    productId,
                    colors.get(i),
                    files.get(i)
            );
        }
    }
}