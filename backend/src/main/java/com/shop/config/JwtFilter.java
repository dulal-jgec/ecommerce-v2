package com.shop.config;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter{

		private final JwtService jwtService;
		
		
		protected  void doFilterInternal(
				HttpServletRequest request,
				HttpServletResponse response,
				FilterChain filterChain
				) throws ServletException,IOException {
			String header = request.getHeader("Authorization");
			
			if(header ==null || !header.startsWith("Bearer ")) {
				filterChain.doFilter(request, response);
				return ;
			}
			
			String token = header.substring(7);
			
			try {
				
				String email = jwtService.extractEmail(token);
				String role = jwtService.extractRole(token);

				UsernamePasswordAuthenticationToken auth =
				        new UsernamePasswordAuthenticationToken(
				                email,
				                null,
				                List.of(new SimpleGrantedAuthority("ROLE_" + role))
				        );
	            SecurityContextHolder.getContext().setAuthentication(auth);

			} catch(Exception ex) {
				SecurityContextHolder.clearContext();
			}
			
			filterChain.doFilter(request, response);
			 
			 
		}
	
}



























