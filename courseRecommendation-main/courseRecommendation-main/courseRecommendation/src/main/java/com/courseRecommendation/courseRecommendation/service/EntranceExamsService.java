package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.EntranceExams;
import com.courseRecommendation.courseRecommendation.repository.EntranceExamsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntranceExamsService {

    private final EntranceExamsRepo entranceExamsRepo;

    public ResponseEntity<ApiResponseDto> getAllEntranceExams() {
        List<EntranceExams> allEntranceExams = entranceExamsRepo.findAll();
        for(EntranceExams e : allEntranceExams) {
            String str = e.getExam();
            String newStr = str.replaceAll("'", "\"");
            e.setExam(newStr);
        }
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("All Entrance Exams")
                .data(allEntranceExams)
                .build();
        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }

}
