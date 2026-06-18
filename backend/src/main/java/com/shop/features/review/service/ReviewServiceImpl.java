package com.shop.features.review.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shop.common.exception.BadRequestException;
import com.shop.common.exception.ResourceNotFoundException;
import com.shop.features.order.entity.OrderStatus;
import com.shop.features.order.repository.OrderItemRepository;
import com.shop.features.product.entity.Product;
import com.shop.features.product.repository.ProductRepository;
import com.shop.features.review.dto.ReviewRequestDto;
import com.shop.features.review.dto.ReviewResponseDto;
import com.shop.features.review.entity.Review;
import com.shop.features.review.mapper.ReviewMapper;
import com.shop.features.review.repository.ReviewRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderItemRepository orderItemRepository;

    @Override
    public ReviewResponseDto createReview(
            Long productId,
            String email,
            ReviewRequestDto request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"
                        ));

        orderItemRepository
                .findFirstByOrderUserIdAndProductIdAndOrderStatus(
                        user.getId(),
                        productId,
                        OrderStatus.DELIVERED
                )
                .orElseThrow(() ->
                        new BadRequestException(
                                "You can review only delivered purchases"
                        ));

        if (reviewRepository
                .findByUserIdAndProductId(
                        user.getId(),
                        productId
                )
                .isPresent()) {

            throw new BadRequestException(
                    "Review already exists. Use update review."
            );
        }

        Review review = new Review();

        review.setUser(user);

        review.setProduct(product);

        review.setRating(
                request.getRating()
        );

        review.setComment(
                request.getComment()
        );

        Review savedReview =
                reviewRepository.save(review);

        return ReviewMapper.toResponse(
                savedReview
        );
    }

    @Override
    public ReviewResponseDto updateReview(
            Long reviewId,
            String email,
            ReviewRequestDto request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Review not found"
                        ));

        if (!review.getUser()
                .getId()
                .equals(user.getId())) {

            throw new BadRequestException(
                    "You can update only your own review"
            );
        }

        review.setRating(
                request.getRating()
        );

        review.setComment(
                request.getComment()
        );

        Review savedReview =
                reviewRepository.save(review);

        return ReviewMapper.toResponse(
                savedReview
        );
    }

    @Override
    public List<ReviewResponseDto> getProductReviews(
            Long productId
    ) {

        return reviewRepository
                .findByProductId(productId)
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }
}