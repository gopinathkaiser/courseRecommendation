package com.courseRecommendation.courseRecommendation.controller;

import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.ChatMessage;
import com.courseRecommendation.courseRecommendation.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@CrossOrigin()
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/messages")
    public ResponseEntity<ApiResponseDto> getMessages() {
        return chatService.getAllMessages();
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<ApiResponseDto> sendMessage(@RequestBody ChatMessage chatMessage) {
        return chatService.addMessage(chatMessage);
    }
}
