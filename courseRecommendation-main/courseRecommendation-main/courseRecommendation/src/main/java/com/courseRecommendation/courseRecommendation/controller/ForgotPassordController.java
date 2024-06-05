package com.courseRecommendation.courseRecommendation.controller;

import com.courseRecommendation.courseRecommendation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ForgotPassordController {

    @Autowired
    private UserService userService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // Generate and store 4-digit code in userDetails table
        System.out.println(email);

        return userService.generateAndStoreCode(email);
    }

    @PostMapping("/validate-code")
    public ResponseEntity<Void> validateCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        boolean isValid = userService.validateCode(email, code);
        System.out.println(isValid + " " + email + " " + code);
        if (isValid) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("password");
        System.out.println(request);
        userService.resetPassword(email, newPassword);
        return ResponseEntity.ok().build();
    }
}

