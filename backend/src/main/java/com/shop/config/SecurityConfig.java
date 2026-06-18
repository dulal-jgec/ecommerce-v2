package com.shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
	public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
		http
	    .cors(cors -> {})
	    .csrf(csrf -> csrf.disable())
	    .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	    )
//	    .authorizeHttpRequests(auth -> auth
//	            .requestMatchers("/api/v1/auth/**").permitAll()
//	            .anyRequest().authenticated()
//	    )
	    
	    .authorizeHttpRequests(auth -> auth
	    		.requestMatchers(
	    		        "/api/v1/auth/**",
	    		        "/api/v1/products",
	    		        "/api/v1/products/**",
	    		        "/api/v1/products/search",
	    		        "/uploads/**",
	    		        "/swagger-ui/**",
	    		        "/swagger-ui.html",
	    		        "/v3/api-docs/**"
	    		         
	    		).permitAll()

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