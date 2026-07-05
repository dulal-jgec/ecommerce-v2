package com.shop.features.product.service;

import com.shop.common.exception.BadRequestException;
import com.shop.config.SecurityConfig;
import com.shop.features.address.controller.AddressController;
import com.shop.features.category.entity.Category;
import com.shop.features.category.repository.CategoryRepository;
import com.shop.features.order.controller.OrderController;
import com.shop.features.product.dto.ProductFilterDto;
import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;
import com.shop.features.product.entity.Product;
import com.shop.features.product.mapper.ProductMapper;
import com.shop.features.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.shop.features.product.specification.ProductSpecification;
import com.shop.features.seller.entity.SellerProfile;
import com.shop.features.seller.entity.SellerStatus;
import com.shop.features.seller.repository.SellerProfileRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Security;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final SecurityConfig securityConfig;
    private final CategoryRepository categoryRepository;

 

    private final ProductRepository productRepository;
    
    private final UserRepository userRepository;
    private final SellerProfileRepository sellerProfileRepository;
    
    
    private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);


    @Override
    public ProductResponseDto createProduct(ProductRequestDto request) {
    	
    	log.info("Creating product with name={}", request.getName());
    	
        //  Extra business validation (defense-in-depth)
        if (request.getPrice().compareTo(java.math.BigDecimal.ONE) < 0) {
        	log.warn("invalid price rewcived : {}",request.getPrice());
            throw new BadRequestException("Price must be at least 1");
        }
        Authentication authentication = 
        		SecurityContextHolder 
        			.getContext()
        			.getAuthentication();
        String email = 
        		authentication.getName();
        
        User seller  = userRepository
        		.findByEmail(email)
        		.orElseThrow(()->
        				new BadRequestException("User not found")
        				);
        
        SellerProfile profile = 
        		sellerProfileRepository
        		.findByUser(seller)
        		.orElseThrow(()->
        				new BadRequestException("Seller profile not found")
        				);
        if(profile.getStatus()
        		!=SellerStatus.APPROVED
        		) {
        	throw new BadRequestException("Seller account not approved yet");
        }
        
        
        // DTO → Entity
        Product product = ProductMapper.toEntity(request);
        product.setOriginalPrice(request.getOriginalPrice());
        product.setSeller(seller);
        
        product.setFeatured(
                Boolean.TRUE.equals(request.getFeatured())
        );

        product.setNewArrival(
                Boolean.TRUE.equals(request.getNewArrival())
        );

        product.setBestSeller(
                Boolean.TRUE.equals(request.getBestSeller())
        );

        product.setTrending(
                Boolean.TRUE.equals(request.getTrending())
        );
        
         
        // Save to DB
        Product savedProduct = productRepository.save(product);
        
        log.info("Product created successfully with id={}", savedProduct.getId());
        
        // Entity → Response DTO
        return ProductMapper.toResponse(savedProduct);
    }
    
    @Override
    public Page<ProductResponseDto> getAllProducts(int page, int size) {

        if (page < 0) page = 0;

        if (size > 50) size = 50;

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage = productRepository.findAll(pageable);

        return productPage.map(ProductMapper::toResponse);
    }
    @Override
    public Page<ProductResponseDto> getFilteredProducts(
            ProductFilterDto filter,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        if (page < 0) page = 0;
        if (size > 50) size = 50;

        // Validate price range
        if (filter.getMinPrice() != null && filter.getMaxPrice() != null) {
            if (filter.getMinPrice().compareTo(filter.getMaxPrice()) > 0) {
                throw new BadRequestException("minPrice cannot be greater than maxPrice");
            }
        }
        
        log.info("fetching products with filter : category={} , minPrice={},maxPrice{}",
        		filter.getCategory(), filter.getMinPrice(),filter.getMaxPrice()
        		);

        if (sortBy != null && 
        	    !sortBy.equals("price") && 
        	    !sortBy.equals("name")) {
        	log.info("sorting by {} iin {} direction",sortBy,direction);
        	    throw new BadRequestException("Invalid sort field");
        	}
        
        if (sortBy == null) {
            sortBy = "id"; // default safe
        }

        // Direction control
        Sort sort = direction != null && direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        var spec = ProductSpecification.filterBy(
                filter.getCategory(),
                filter.getMinPrice(),
                filter.getMaxPrice()
        );

        Page<Product> productPage = productRepository.findAll(spec, pageable);

        return productPage.map(ProductMapper::toResponse);
    }
    @Override
    public ProductResponseDto updateProduct(
            Long productId,
            ProductRequestDto request
    ) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id: " + productId));
        
        Authentication auth = 
        		SecurityContextHolder
        		.getContext()
        		.getAuthentication();
        
        String email = auth.getName();
        
        User seller = userRepository.findByEmail(email).orElseThrow();
        
        if(!product.getSeller()
        		.getId()
        		.equals(seller.getId())
        		) {
        	throw new BadRequestException("You can update only your own products");
        }
        	

        
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setStock(request.getStock());
        product.setColor(request.getColor());
        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new BadRequestException("Category not found"));

        product.setCategory(category);
        product.setCategory(category);
        product.setSize(request.getSize());
        
        product.setFeatured(
                Boolean.TRUE.equals(request.getFeatured())
        );

        product.setNewArrival(
                Boolean.TRUE.equals(request.getNewArrival())
        );

        product.setBestSeller(
                Boolean.TRUE.equals(request.getBestSeller())
        );

        product.setTrending(
                Boolean.TRUE.equals(request.getTrending())
        );

        Product savedProduct = productRepository.save(product);

        return ProductMapper.toResponse(savedProduct);
    }
    
    @Override
    public void deleteProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id: " + productId));
        
        Authentication auth = 
        		SecurityContextHolder
        		.getContext()
        		.getAuthentication();
        
        String email = auth.getName();
        
        User seller = userRepository.findByEmail(email).orElseThrow();
        
        if (!product.getSeller()
                .getId()
                .equals(seller.getId())) {

            throw new BadRequestException(
                    "You can delete only your own products"
            );
        }

        productRepository.delete(product);
    }
    
    @Override
    public ProductResponseDto getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

        return ProductMapper.toResponse(product);
    }
    
    public List<ProductResponseDto>getFeaturedProducts(){
    	return productRepository.findByFeaturedTrue()
    			.stream()
    			.map(ProductMapper::toResponse)
    			.toList();
    }
     
    public List<ProductResponseDto> getNewArrivalProducts(){
    	return productRepository.findByNewArrivalTrue()
    			.stream()
    			.map(ProductMapper::toResponse)
    			.toList();
    }
    
    public List<ProductResponseDto> getBestSellerProducts(){
    	
    	return productRepository.findByBestSellerTrue()
    			.stream()
    			.map(ProductMapper::toResponse)
    			.toList();
    }
    
    public List<ProductResponseDto>getTrendingProducts(){
    	return productRepository.findByTrendingTrue()
    			.stream()
    			.map(ProductMapper::toResponse)
    			.toList();
    }
    @Override
    public List<ProductResponseDto>
    getMyProducts(){
    	Authentication authentication= 
    			SecurityContextHolder
    			.getContext()
    			.getAuthentication();
    	String email= 
    			authentication.getName();
    	
    	User seller = 
    			userRepository.findByEmail(email)
    			.orElseThrow();
    	
    	return  productRepository
    			.findBySeller(seller)
    			.stream()
    			.map(ProductMapper::toResponse)
    			.toList();
    }
    
    }





















