package com.shop.features.user.service;

import com.shop.features.user.entity.User;
import com.shop.features.user.entity.UserRole;
import com.shop.features.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

     
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
     
    public List<User> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

     
    public List<User> getActiveUsers() {
        return userRepository.findByEnabled(true);
    }

    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

     
    public User toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(!user.getEnabled());
        return userRepository.save(user);
    }

     
    public User changeUserRole(Long id, UserRole newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(newRole);
        return userRepository.save(user);
    }

    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


	 
}