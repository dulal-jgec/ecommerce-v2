package com.shop.features.address.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shop.common.exception.ResourceNotFoundException;
import com.shop.features.address.dto.AddressRequestDto;
import com.shop.features.address.dto.AddressResponseDto;
import com.shop.features.address.entity.Address;
import com.shop.features.address.mapper.AddressMapper;
import com.shop.features.address.repository.AddressRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Override
    public AddressResponseDto createAddress(
            String email,
            AddressRequestDto request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

         
        Address address = AddressMapper.toEntity(request);

        address.setUser(user);

        
        if (Boolean.TRUE.equals(request.getDefaultAddress())) {

            addressRepository
                    .findByUserIdAndDefaultAddressTrue(user.getId())
                    .ifPresent(existingDefault -> {

                        existingDefault.setDefaultAddress(false);

                        addressRepository.save(existingDefault);
                    });
        }

        Address savedAddress =
                addressRepository.save(address);

        return AddressMapper.toResponse(savedAddress);
    }

    @Override
    public List<AddressResponseDto> getMyAddresses(
            String email
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return addressRepository
                .findByUserId(user.getId())
                .stream()
                .map(AddressMapper::toResponse)
                .toList();
    }
    
    @Override
    public AddressResponseDto updateAddress(
            String email,
            Long addressId,
            AddressRequestDto request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Address address = addressRepository
                .findByIdAndUserId(addressId, user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

        address.setFullName(request.getFullName());
        address.setPhoneNumber(request.getPhoneNumber());
        address.setAddressLine1(request.getAddressLine1());
        address.setAddressLine2(request.getAddressLine2());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());
        address.setCountry(request.getCountry());

        Address updatedAddress =
                addressRepository.save(address);

        return AddressMapper.toResponse(updatedAddress);
    }
    
    
    
    @Override
    public void deleteAddress(
            String email,
            Long addressId
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Address address = addressRepository
                .findByIdAndUserId(addressId, user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

        addressRepository.delete(address);
    }
    
    
    @Override
    public AddressResponseDto setDefaultAddress(
            String email,
            Long addressId
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Address address = addressRepository
                .findByIdAndUserId(addressId, user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

         
        addressRepository
                .findByUserIdAndDefaultAddressTrue(user.getId())
                .ifPresent(existingDefault -> {

                    existingDefault.setDefaultAddress(false);

                    addressRepository.save(existingDefault);
                });
 
        address.setDefaultAddress(true);

        Address updated =
                addressRepository.save(address);

        return AddressMapper.toResponse(updated);
    }   
}