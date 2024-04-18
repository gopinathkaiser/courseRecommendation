package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.AddPostDto;
import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.Post;
import com.courseRecommendation.courseRecommendation.repository.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepo postRepo;

    public ResponseEntity<ApiResponseDto> addPosts(AddPostDto addPostDto){
        Post post = Post.builder()
                .caption(addPostDto.getCaption())
                .image(addPostDto.getImage())
                .title(addPostDto.getTitle())
                .build();

        postRepo.save(post);
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.CREATED)
                .message("Post created Successfully")
                .data(post)
                .build();

        return new ResponseEntity<>(apiResponseDto, HttpStatus.CREATED);
    }

    public ResponseEntity<ApiResponseDto> getAllPosts() {
        List<Post> posts = postRepo.findAllByOrderByCreatedAtDesc();
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Post fetched")
                .data(posts)
                .build();

        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }
}
