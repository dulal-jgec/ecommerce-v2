package com.shop.features.cart.service;

import com.shop.common.exception.BadRequestException;
import com.shop.common.exception.ResourceNotFoundException;
import com.shop.features.cart.dto.AddToCartRequestDto;
import com.shop.features.cart.dto.CartResponseDto;
import com.shop.features.cart.dto.UpdateCartItemDto;
import com.shop.features.cart.entity.Cart;
import com.shop.features.cart.entity.CartItem;
import com.shop.features.cart.mapper.CartMapper;
import com.shop.features.cart.repository.CartItemRepository;
import com.shop.features.cart.repository.CartRepository;
import com.shop.features.product.entity.Product;
import com.shop.features.product.repository.ProductRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartResponseDto addToCart(String email, AddToCartRequestDto request) {

         
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

         
        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock");
        }

         
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

         
        CartItem existingItem = cart.getItems()
                .stream()
                .filter(item ->
                        item.getProduct().getId()
                        .equals(product.getId())
                        &&
                        item.getColor()
                        .equals(request.getColor())
                        ) 
                .findFirst()
                .orElse(null);

        if (existingItem != null) {

            // update quantity
            existingItem.setQuantity(
                    existingItem.getQuantity() + request.getQuantity()
            );

            cartItemRepository.save(existingItem);

        } else {

            //create new cart item
            CartItem item = new CartItem();

            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(request.getQuantity());

            //price snapshot
            item.setPrice(product.getPrice());
            
            item.setColor(request.getColor());

            cart.getItems().add(item);
            

            cartItemRepository.save(item);
        }

        return CartMapper.toResponse(cart);
    }

    @Override
    public CartResponseDto getCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        return CartMapper.toResponse(cart);
    }
    
    @Override
    public CartResponseDto updateQuantity(
    		 String email,
    		 UpdateCartItemDto request
    	) {
    	
    	User user = userRepository.findByEmail(email)
    			.orElseThrow(()-> new ResourceNotFoundException("User not found"));
    	
    	Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
    	
    	
    	CartItem item = cart.getItems()
    			.stream()
    			.filter(i ->i.getId().equals(request.getCartItemId()))
    			.findFirst()
    			.orElseThrow(()-> new ResourceNotFoundException("cart item not found"));
    		
    	// stock check 
    	
    	if(item.getProduct().getStock()<request.getQuantity()) {
    		throw new BadRequestException("Insufficient stock");
    	}
    	
    	item.setQuantity(request.getQuantity());
    	
    	cartItemRepository.save(item);
    	return CartMapper.toResponse(cart); 
    	
    }
    
    
    @Override
    public void removeItem(String email, Long cartItemId) {
    	
    	User user = userRepository.findByEmail(email)
    			.orElseThrow(()-> new ResourceNotFoundException("Userr not found"));
    	
    	Cart cart = cartRepository.findByUserId(user.getId())
    			.orElseThrow(()->new ResourceNotFoundException("Cart not found"));
    	
    	CartItem item = cart.getItems()
    			.stream()
    			.filter(i->i.getId().equals(cartItemId))
    			.findFirst()
    			.orElseThrow(()->new ResourceNotFoundException("Cart item not found"));
    	
    	
    	cart.getItems().remove(item);
    	cartRepository.save(cart);
    }
    
    @Override
    
    public void clearCart(String email) {
    	
    	User user = userRepository.findByEmail(email)
    			.orElseThrow(()->new ResourceNotFoundException("User not found"));
    	
    	Cart cart = cartRepository.findByUserId(user.getId())
                 .orElseThrow(()->new ResourceNotFoundException("Cart not found"));
    	
	
    	cart.getItems().clear();
    	cartRepository.save(cart);
    	
    }
     
}