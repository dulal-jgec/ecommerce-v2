package com.shop.features.product.repository;

import com.shop.features.product.entity.Product;
import com.shop.features.user.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends JpaRepository<Product, Long>,JpaSpecificationExecutor<Product> {
	List<Product> findByFeaturedTrue();

	List<Product> findByNewArrivalTrue();

	List<Product> findByBestSellerTrue();

	List<Product> findByTrendingTrue();
	
	
	List<Product> findBySeller(User seller);
}