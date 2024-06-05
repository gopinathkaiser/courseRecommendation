package com.courseRecommendation.courseRecommendation.controller;

import com.courseRecommendation.courseRecommendation.dto.AddUserDto;
import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.dto.LoginUserDto;
import com.courseRecommendation.courseRecommendation.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping()
    public ResponseEntity<ApiResponseDto> addUser(@RequestBody AddUserDto addUserDto){
        return authService.createUser(addUserDto);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto> loginUser(@RequestBody LoginUserDto loginUserDto){
        return authService.checkUserLogin(loginUserDto);
    }

}
