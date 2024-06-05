package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.model.UserDetails;
import com.courseRecommendation.courseRecommendation.repository.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserDetailsRepo userDetailsRepo;
    @Autowired
    private EmailService emailService;
    private final PasswordEncoder passwordEncoder;



    @Autowired
    public UserService(UserDetailsRepo userDetailsRepo, PasswordEncoder passwordEncoder) {
        this.userDetailsRepo = userDetailsRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> generateAndStoreCode(String email) {
        // Generate and store 4-digit code in userDetails table
        // Implement your code generation logic here
        Long code = Long.parseLong(generateCode()); // Example method to generate code
        UserDetails userDetails = userDetailsRepo.findByEmail(email);
        if (userDetails != null) {
            userDetails.setCode(code);
            userDetailsRepo.save(userDetails);
            emailService.sendCodeByEmail(email, String.valueOf(code));
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    public boolean validateCode(String email, String code) {
        UserDetails userDetails = userDetailsRepo.findByEmailAndCode(email, Long.valueOf(code));
        return userDetails != null;
    }

    public void resetPassword(String email, String newPassword) {
        UserDetails userDetails = userDetailsRepo.findByEmail(email);
        if (userDetails != null) {
            userDetails.setPassword(passwordEncoder.encode(newPassword));
            userDetailsRepo.save(userDetails);
        }
    }

    // Example method to generate a 4-digit code
    private String generateCode() {
        // Implement your code generation logic here
        // For example, generate a random 4-digit code
        int min = 1000;
        int max = 9999;
        int code = (int) (Math.random() * (max - min + 1)) + min;
        return String.valueOf(code);
    }
}
