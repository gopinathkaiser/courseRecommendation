package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.ChatMessage;
import com.courseRecommendation.courseRecommendation.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;


    public ResponseEntity<ApiResponseDto> getAllMessages() {
        List<ChatMessage> messages = chatMessageRepository.findAllByOrderByTimestamp();
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Messages Fetched Successfully")
                .data(messages)
                .build();
        return new ResponseEntity<>(apiResponseDto,HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto> addMessage(ChatMessage chatMessage) {
        ChatMessage chatMessages = chatMessageRepository.save(chatMessage);
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Messages added Successfully")
                .data(chatMessages)
                .build();
        return new ResponseEntity<>(apiResponseDto,HttpStatus.OK);
    }
}
