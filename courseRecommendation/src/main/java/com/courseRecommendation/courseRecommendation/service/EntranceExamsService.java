package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.EntranceExams;
import com.courseRecommendation.courseRecommendation.repository.EntranceExamsRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EntranceExamsService {

    private final EntranceExamsRepo entranceExamsRepo;

    public ResponseEntity<ApiResponseDto> getAllEntranceExams() {
        List<EntranceExams> allEntranceExams = entranceExamsRepo.findAll();
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("All Entrance Exams")
                .data(allEntranceExams)
                .build();
        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }

}
