// src/main/java/com/shop/features/user/controller/UserController.java
package com.shop.features.user.controller;

import com.shop.common.dto.ApiResponse;
import com.shop.features.user.entity.User;
import com.shop.features.user.entity.UserRole;
import com.shop.features.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

     
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Page<User>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.getAllUsers(pageable);
        
        return ResponseEntity.ok(
                ApiResponse.<Page<User>>builder()
                        .success(true)
                        .message("Users fetched successfully")
                        .data(users)
                        .build()
        );
    }

    
    @GetMapping("/admin/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> getUserById(
            @PathVariable Long userId
    ) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return ResponseEntity.ok(
                ApiResponse.<User>builder()
                        .success(true)
                        .message("User fetched successfully")
                        .data(user)
                        .build()
        );
    }

    
    @PatchMapping("/admin/{userId}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> toggleUserStatus(
            @PathVariable Long userId
    ) {
        User user = userService.toggleUserStatus(userId);
        
        return ResponseEntity.ok(
                ApiResponse.<User>builder()
                        .success(true)
                        .message("User status updated successfully")
                        .data(user)
                        .build()
        );
    }

     
    @PatchMapping("/admin/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> changeUserRole(
            @PathVariable Long userId,
            @RequestParam UserRole role
    ) {
        User user = userService.changeUserRole(userId, role);
        
        return ResponseEntity.ok(
                ApiResponse.<User>builder()
                        .success(true)
                        .message("User role updated successfully")
                        .data(user)
                        .build()
        );
    }

     
    @DeleteMapping("/admin/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long userId
    ) {
        userService.deleteUser(userId);
        
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("User deleted successfully")
                        .build()
        );
    }

     
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getMyProfile(
            Authentication authentication
    ) {
        String email = authentication.getName();
         
        
        return ResponseEntity.ok(
                ApiResponse.<User>builder()
                        .success(true)
                        .message("Profile fetched successfully")
                        // .data(user)
                        .build()
        );
    }
}