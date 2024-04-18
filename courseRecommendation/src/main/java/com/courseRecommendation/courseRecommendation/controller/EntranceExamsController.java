package com.courseRecommendation.courseRecommendation.controller;

import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.service.EntranceExamsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/EntranceExams")
@RequiredArgsConstructor
public class EntranceExamsController {

    private final EntranceExamsService entranceExamsService;

    @GetMapping
    public ResponseEntity<ApiResponseDto> getEntranceExams() {
        return entranceExamsService.getAllEntranceExams();
    }
}
