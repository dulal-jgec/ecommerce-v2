package com.shop.features.product.specification;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.shop.features.product.entity.Product;

public class ProductSpecification {

	  public static Specification<Product> filterBy(
	            String category,
	            BigDecimal minPrice,
	            BigDecimal maxPrice
	    ) {
		  return (root,query,cb)->{
			  var predicates = cb.conjunction();
			  
			  if (category != null && !category.trim().isEmpty()) {

				    predicates = cb.and(
				            predicates,
				            cb.equal(
				                    cb.lower(
				                            root.get("category").get("name")
				                    ),
				                    category.toLowerCase()
				            )
				    );
				}
			  
			  if(minPrice!=null) {
				  predicates = cb.and(predicates,
						  cb.greaterThanOrEqualTo(root.get("price"), minPrice)
						  );
			  }
			  
			  if(maxPrice != null) {
				    predicates = cb.and(predicates,
				        cb.lessThanOrEqualTo(root.get("price"), maxPrice)
				    );
				}
			  return predicates;
		  };
		
	}
}

