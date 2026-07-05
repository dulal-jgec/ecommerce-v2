package com.shop.features.order.service;

import java.math.BigDecimal; 
import java.util.List;

import com.shop.common.exception.BadRequestException;
import com.shop.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.shop.config.SecurityConfig;
import com.shop.features.cart.entity.Cart;
import com.shop.features.cart.entity.CartItem;
import com.shop.features.cart.repository.CartRepository;
import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.dto.PlaceOrderRequestDto;
import com.shop.features.order.dto.UpdateOrderStatusDto;
import com.shop.features.order.entity.Order;
import com.shop.features.order.entity.OrderItem;
import com.shop.features.order.entity.OrderItemStatus;
import com.shop.features.order.entity.OrderStatus;
import com.shop.features.order.entity.UpdateOrderItemStatusDto;
import com.shop.features.order.mapper.OrderMapper;
import com.shop.features.order.repository.OrderItemRepository;
import com.shop.features.order.repository.OrderRepository;
import com.shop.features.product.entity.Product;
import com.shop.features.seller.dto.SellerOrderResponseDto;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;
import com.shop.features.address.entity.Address;
import com.shop.features.address.repository.AddressRepository;


@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final SecurityConfig securityConfig;
		
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final OrderRepository orderRepository;
	private final AddressRepository addressRepository;
	private final OrderItemRepository orderItemRepository;	
	@Override
	@Transactional
	public OrderResponseDto placeOrder(
	        String email,
	        PlaceOrderRequestDto request
	) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("User not found"));
	    
	    Address address = addressRepository
	            .findByIdAndUserId(
	                    request.getAddressId(),
	                    user.getId()
	            )
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Address not found"));
	    
	    Cart cart = cartRepository.findByUserId(user.getId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Cart not found"));

	    if (cart.getItems().isEmpty()) {
	        throw new BadRequestException("Cart is empty");
	    }

	    Order order = new Order();
	    order.setUser(user);
	    order.setStatus(OrderStatus.PLACED);
	    
	    order.setShippingFullName(
	            address.getFullName()
	    );

	    order.setShippingPhoneNumber(
	            address.getPhoneNumber()
	    );

	    order.setShippingAddressLine1(
	            address.getAddressLine1()
	    );

	    order.setShippingAddressLine2(
	            address.getAddressLine2()
	    );

	    order.setShippingCity(
	            address.getCity()
	    );

	    order.setShippingState(
	            address.getState()
	    );

	    order.setShippingPostalCode(
	            address.getPostalCode()
	    );

	    order.setShippingCountry(
	            address.getCountry()
	    );
	    
	    
	    BigDecimal total = BigDecimal.ZERO;
			 
			 // cart-> order items
			 
			 for(CartItem cartItem : cart.getItems()) {

				    Product product = cartItem.getProduct();

				    if(product.getStock() < cartItem.getQuantity()) {
				        throw new BadRequestException(
				            "Insufficient stock for product: " + product.getName()
				        );
				    }

				    product.setStock(product.getStock() - cartItem.getQuantity());

				    OrderItem orderItem = new OrderItem();

				    orderItem.setOrder(order);

				    orderItem.setProduct(product);

				    orderItem.setQuantity(cartItem.getQuantity());

				    orderItem.setPrice(cartItem.getPrice());
				    
				    orderItem.setColor(cartItem.getColor());
				    
				    orderItem.setStatus(OrderItemStatus.PAID);

				    order.getItems().add(orderItem);

				    total = total.add(
				        cartItem.getPrice().multiply(
				            BigDecimal.valueOf(cartItem.getQuantity())
				        )
				    );
				} 
		            
		            // final order 
		            
		            order.setTotalPrice(total);
		            
		            // save order
		            
		            Order saveOrder= orderRepository.save(order);
		            
		             		            
		             
		            return OrderMapper.toResponseDto(saveOrder);
			 }
			 
			 public List<OrderResponseDto>getMyOrders(String email){
				 
				 System.out.println("EMAIL = " + email);
				 
				 User user = userRepository.findByEmail(email)
						 .orElseThrow(()-> new ResourceNotFoundException("User not found"));
				 
				 return orderRepository.findByUserId(user.getId())
						 .stream()
						 .map(OrderMapper::toResponseDto)
						 .toList();
			 }
		

	@Override
	public List<OrderResponseDto> getAllOrders(){
		return orderRepository.findAll()
				.stream()
				.map(OrderMapper::toResponseDto)
				.toList();
	}
	
	@Override
	@Transactional
	public OrderResponseDto updateOrderStatus(Long orderId,UpdateOrderStatusDto request) {
		Order order = orderRepository.findById(orderId)
				.orElseThrow(()->new ResourceNotFoundException("order not found"));
		
		// validation 
		if(order.getStatus()==OrderStatus.DELIVERED) {
			throw new BadRequestException("Delivered order cannot be modified");
			
		}
		
		order.setStatus(request.getStatus());
		Order saveOrder = orderRepository.save(order);
		
		return OrderMapper.toResponseDto(saveOrder);
	}
	
	@Override
	public OrderResponseDto getOrderById(
	        String email,
	        Long orderId
	) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "User not found"));

	    Order order = orderRepository.findById(orderId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Order not found"));

	    if (!order.getUser().getId().equals(user.getId())) {
	        throw new BadRequestException(
	                "Order does not belong to user");
	    }

	    return OrderMapper.toResponseDto(order);
	}
	 
	@Override
	public OrderResponseDto getOrderForAdmin(
	        Long orderId
	) {

	    Order order =
	            orderRepository.findById(orderId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Order not found"
	                    ));

	    return OrderMapper.toResponseDto(order);
	}
	
	@Override
	public List<SellerOrderResponseDto> getSellerOrders(String email) {

	    User seller = userRepository.findByEmail(email)
	            .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

	    List<OrderItem> items =
	            orderItemRepository.findByProductSellerId(seller.getId());

	    return items.stream()
	            .map(item -> {

	                String imageUrl = item.getProduct()
	                        .getImages()
	                        .stream()
	                        .filter(img ->
	                                img.getColor()
	                                        .equalsIgnoreCase(item.getColor()))
	                        .findFirst()
	                        .map(img -> img.getImageUrl())
	                        .orElse(null);

	                return SellerOrderResponseDto.builder()
	                        .orderId(item.getOrder().getId())
	                        .orderItemId(item.getId())
	                        .productName(item.getProduct().getName())
	                        .imageUrl(imageUrl)
	                        .color(item.getColor())
	                        .quantity(item.getQuantity())
	                        .price(item.getPrice())
	                        .customerName(item.getOrder().getShippingFullName())
	                        .customerPhone(item.getOrder().getShippingPhoneNumber())
	                        .address(item.getOrder().getShippingAddressLine1())
	                        .status(item.getStatus().name())
	                        .build();
	            })
	            .toList();
	}
	
	@Override
	public SellerOrderResponseDto getSellerOrderDetails(
	        String email,
	        Long orderItemId
	) {

	    User seller = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Seller not found"));
	    
	    

	    OrderItem item = orderItemRepository
	            .findById(orderItemId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Order item not found"));
	    
	    String imageUrl = item.getProduct()
	            .getImages()
	            .stream()
	            .filter(img ->
	                    img.getColor()
	                            .equalsIgnoreCase(item.getColor()))
	            .findFirst()
	            .map(img -> img.getImageUrl())
	            .orElse(null);

	    if (!item.getProduct()
	            .getSeller()
	            .getId()
	            .equals(seller.getId())) {

	        throw new BadRequestException(
	                "This order does not belong to seller"
	        );
	    }

	    return SellerOrderResponseDto.builder()
	            .orderId(item.getOrder().getId())
	            .orderItemId(item.getId())
	            .productName(item.getProduct().getName())
	            .color(item.getColor())
	            .quantity(item.getQuantity())
	            .imageUrl(imageUrl)
	            .price(item.getPrice())
	            .customerName(
	                    item.getOrder().getShippingFullName()
	            )
	            .customerPhone(
	                    item.getOrder().getShippingPhoneNumber()
	            )
	            .address(
	                    item.getOrder().getShippingAddressLine1()
	            )
	            .status(
	            	    item.getStatus() != null
	            	        ? item.getStatus().name()
	            	        : "PAID"
	            	
	            )
	            .build();
	}
	
	@Override
	@Transactional
	public SellerOrderResponseDto updateSellerOrderStatus(
	        String email,
	        Long orderItemId,
	        UpdateOrderItemStatusDto request
	) {

	    User seller = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Seller not found"));

	    OrderItem item = orderItemRepository.findById(orderItemId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Order item not found"));

	    if (!item.getProduct()
	            .getSeller()
	            .getId()
	            .equals(seller.getId())) {

	        throw new BadRequestException(
	                "This order does not belong to seller"
	        );
	    }

	    item.setStatus(request.getStatus());

	    orderItemRepository.save(item);

	    return OrderMapper.toSellerResponseDto(item);
	}
}
 