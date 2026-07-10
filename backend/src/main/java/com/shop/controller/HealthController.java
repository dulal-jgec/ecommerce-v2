package com.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "Backend Running";
    }

    @RestController
    public class HomeController {

        @GetMapping("/")
        public String home() {
            return "ShopLy Backend Running";
        }

    }
}