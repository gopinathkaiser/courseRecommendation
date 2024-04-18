package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.AddUserDto;
import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.dto.LoginUserDto;
import com.courseRecommendation.courseRecommendation.model.UserDetails;
import com.courseRecommendation.courseRecommendation.repository.UserDetailsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserDetailsRepo userDetailsRepo;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<ApiResponseDto> createUser(AddUserDto addUserDto) {
        UserDetails userDetails = userDetailsRepo.findByEmail(addUserDto.getEmail());
        if(userDetails != null){
            ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                    .status(HttpStatus.CONFLICT)
                    .message("User Already Exists")
                    .data(null)
                    .build();
            return new ResponseEntity<>(apiResponseDto,HttpStatus.CONFLICT);
        }
        UserDetails userDetailsStore = UserDetails.builder()
                        .username(addUserDto.getUsername())
                                .email(addUserDto.getEmail())
                                        .password(passwordEncoder.encode(addUserDto.getPassword()))
                                                .build();

        userDetails = userDetailsRepo.save(userDetailsStore);
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.CREATED)
                .message("User added successfully")
                .data(userDetails)
                .build();
        return new ResponseEntity<>(apiResponseDto, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponseDto> checkUserLogin(LoginUserDto loginUserDto) {
        UserDetails userDetails = userDetailsRepo.findByEmail(loginUserDto.getEmail());
        if (userDetails == null) {
            ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .message("User not found")
                    .data(null)
                    .build();
            return new ResponseEntity<>(apiResponseDto,HttpStatus.BAD_REQUEST);
        }

        if(!passwordEncoder.matches(loginUserDto.getPassword(), userDetails.getPassword())) {
            ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                    .status(HttpStatus.UNAUTHORIZED)
                    .message("Wrong Credentials")
                    .data(null)
                    .build();
            return new ResponseEntity<>(apiResponseDto,HttpStatus.UNAUTHORIZED);
        }

        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Login Successful")
                .data(userDetails)
                .build();
        return new ResponseEntity<>(apiResponseDto,HttpStatus.OK);

    }
}
