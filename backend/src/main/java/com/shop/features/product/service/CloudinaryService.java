package com.shop.features.product.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
		private final Cloudinary cloudinary;
		
		public String uploadFile(MultipartFile file) {
			try {
				Map uploadResult = 
						cloudinary.uploader()
							.upload(file.getBytes(),
									Map.of()
									);
				return uploadResult
						.get("secure_url")
						.toString();
			}
			catch(IOException e) {
				throw new RuntimeException(
						"Failed to upload imageto cloudinary",e
						);
			}
		}
}
