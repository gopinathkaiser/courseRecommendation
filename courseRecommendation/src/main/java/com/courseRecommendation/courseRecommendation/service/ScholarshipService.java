package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.Scholarship;
import com.courseRecommendation.courseRecommendation.repository.ScholarshipRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScholarshipService {

    private final ScholarshipRepo scholarshipRepo;

    public ResponseEntity<ApiResponseDto> getAllScholarships() {
        List<Scholarship> scholarships =  scholarshipRepo.findAll();
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("All scholarships")
                .data(scholarships)
                .build();
        return new ResponseEntity<>(apiResponseDto,HttpStatus.OK);
    }
}
