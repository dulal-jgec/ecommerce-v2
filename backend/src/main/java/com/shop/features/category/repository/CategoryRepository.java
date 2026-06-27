package com.shop.features.category.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByActiveTrue();

}