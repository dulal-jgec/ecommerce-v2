package com.shop.features.payment.service;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.shop.common.exception.BadRequestException;
import com.shop.common.exception.ResourceNotFoundException;
import com.shop.features.cart.entity.Cart;
import com.shop.features.cart.repository.CartRepository;
import com.shop.features.order.entity.OrderStatus;
import com.shop.features.order.repository.OrderRepository;
import com.shop.features.payment.dto.CreatePaymentRequestDto;
import com.shop.features.payment.dto.CreatePaymentResponseDto;
import com.shop.features.payment.dto.VerifyPaymentRequestDto;
import com.shop.features.payment.entity.Payment;
import com.shop.features.payment.entity.PaymentStatus;
import com.shop.features.payment.repository.PaymentRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final UserRepository userRepository;

	private final OrderRepository orderRepository;

	private final PaymentRepository paymentRepository;

	private final CartRepository cartRepository;
	private final RazorpayClient razorpayClient;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;
    
    
    @Override
    public CreatePaymentResponseDto createPayment(
            String email,
            CreatePaymentRequestDto request
    ) {

        try {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "User not found"));

            var orderEntity = orderRepository
                    .findById(request.getOrderId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Order not found"));

            // Ownership validation
            if (!orderEntity.getUser()
                    .getId()
                    .equals(user.getId())) {

                throw new BadRequestException(
                        "Order does not belong to user");
            }

            JSONObject options = new JSONObject();

            options.put(
                    "amount",
                    orderEntity.getTotalPrice()
                            .multiply(BigDecimal.valueOf(100))
                            .intValue()
            );

            options.put(
                    "currency",
                    "INR"
            );

            Order razorpayOrder =
                    razorpayClient.orders.create(options);

            Payment payment = new Payment();

            payment.setOrder(orderEntity);

            payment.setAmount(
                    orderEntity.getTotalPrice()
            );

            payment.setStatus(
                    PaymentStatus.PENDING
            );

            payment.setRazorpayOrderId(
                    razorpayOrder.get("id")
                            .toString()
            );

            Payment savedPayment =
                    paymentRepository.save(payment);

            return CreatePaymentResponseDto
                    .builder()
                    .paymentId(savedPayment.getId())
                    .razorpayOrderId(
                            savedPayment.getRazorpayOrderId()
                    )
                    .key(razorpayKeyId)
                    .build();

        } catch (Exception ex) {

            throw new RuntimeException(
                    "Failed to create payment",
                    ex
            );
        }
    }    
        @Override
        public boolean verifyPayment(
        		VerifyPaymentRequestDto request
        		) {
        	try {
        		
        		JSONObject options=new JSONObject();
        		
        		options.put("razorpay_order_id", request.getRazorpayOrderId());
        		
        		options.put(
        				"razorpay_payment_id",
        				request.getRazorpayPaymentId()
        				);
        		options.put("razorpay_signature", request.getRazorpaySignature());
        		
        		boolean isValid=Utils.verifyPaymentSignature(options, razorpayKeySecret);
        		
        		if(!isValid){
        			return false; 
        		}
        		
        		Payment payment = 
        				paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
        				.orElseThrow(()->
        					new ResourceNotFoundException("Payment not found")
        						);
        		
        		payment.setStatus(PaymentStatus.SUCCESS);
        		
        		payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        		
        		payment.setRazorpaySignature(
        				request.getRazorpaySignature()
        				);
        		 
        		paymentRepository.save(payment);
        		
        		
        		var order = payment.getOrder();
        		order.setStatus(OrderStatus.PAID);
        		
        		orderRepository.save(order);
        		Cart cart = cartRepository.findByUserId(
        		        order.getUser().getId()
        		)
        		.orElseThrow(() ->
        		        new ResourceNotFoundException("Cart not found")
        		);

        		cart.getItems().clear();

        		cartRepository.save(cart);
        		
        		return true ; 
        					
        		
        	} catch(Exception ex) {
        		 throw new RuntimeException(
        	                "Payment verification failed",
        	                ex
        	        );
        	}
        }
        
    }


































