package com.courseRecommendation.courseRecommendation.controller;

import com.courseRecommendation.courseRecommendation.dto.AddPostDto;
import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts/")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<ApiResponseDto> addPosts(@RequestBody AddPostDto addPostDto){
        return postService.addPosts(addPostDto);
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto> getPosts(){
        return postService.getAllPosts();
    }

    @GetMapping("delete/{id}")
    public ResponseEntity<ApiResponseDto> deletePost(@PathVariable Long id){
        System.out.println("called");
        return postService.deletePost(id);
    }
}
