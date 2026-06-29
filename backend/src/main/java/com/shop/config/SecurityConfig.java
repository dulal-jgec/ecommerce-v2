package com.shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import lombok.RequiredArgsConstructor;

@EnableMethodSecurity
@Configuration   
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
	    .cors(cors -> {})
	    .csrf(csrf -> csrf.disable())
	    .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	    )
	    .authorizeHttpRequests(auth -> auth
 	    		.requestMatchers(
	    		        "/api/v1/auth/**",           
	    		        "/api/v1/products/featured",  
	    		        "/api/v1/products/best-sellers",  
	    		        "/api/v1/products/trending",  
	    		        "/api/v1/products/search",    
	    		        "/api/v1/categories",         
	    		        "/api/v1/reviews/testimonials",  
	    		        "/uploads/**",                
	    		        "/swagger-ui/**",
	    		        "/swagger-ui.html",
	    		        "/v3/api-docs/**"
	    		).permitAll()
	    		
 	    		.requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
	    		
 	    		.requestMatchers(
	    		        "/api/v1/users/admin/**",     
	    		        "/api/v1/orders/admin/**",   
	    		        "/api/v1/seller/**",         
	    		        "/api/v1/reviews/**/feature",   
	    		        "/api/v1/reviews/**/unfeature"  
	    		).hasRole("ADMIN")
	    		
 	    		.requestMatchers(
	    		        "/api/v1/products/my-products",  
	    		        "/api/v1/orders/seller/**"      
	    		).hasAnyRole("SELLER", "ADMIN")
	    		
 	    		.requestMatchers(HttpMethod.POST, "/api/v1/products").hasAnyRole("SELLER", "ADMIN")
	    		.requestMatchers(HttpMethod.PUT, "/api/v1/products/**").hasAnyRole("SELLER", "ADMIN")
	    		.requestMatchers(HttpMethod.DELETE, "/api/v1/products/**").hasAnyRole("SELLER", "ADMIN")
	    		.requestMatchers("/api/v1/products/**/images/**").hasAnyRole("SELLER", "ADMIN")
	    		
 	    		.requestMatchers(
	    		        "/api/v1/cart/**",            
	    		        "/api/v1/orders",            
	    		        "/api/v1/orders/**",          
	    		        "/api/v1/addresses/**",      
	    		        "/api/v1/payments/**",        
	    		        "/api/v1/reviews/products/**",  
	    		        "/api/v1/users/profile"       
	    		).authenticated()
	    		
 	    		.anyRequest().authenticated()
	    )
	    .exceptionHandling(ex -> ex
	            .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
	    )
	    .addFilterBefore(jwtFilter,
	            org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
	    );
		return http.build();
	}
}