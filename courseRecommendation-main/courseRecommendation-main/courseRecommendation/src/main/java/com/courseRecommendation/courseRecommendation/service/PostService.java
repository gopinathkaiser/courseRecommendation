package com.courseRecommendation.courseRecommendation.service;

import com.courseRecommendation.courseRecommendation.dto.AddPostDto;
import com.courseRecommendation.courseRecommendation.dto.ApiResponseDto;
import com.courseRecommendation.courseRecommendation.model.Post;
import com.courseRecommendation.courseRecommendation.model.UserDetails;
import com.courseRecommendation.courseRecommendation.repository.PostRepo;
import com.courseRecommendation.courseRecommendation.repository.UserDetailsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.sql.Time;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepo postRepo;
    private final UserDetailsRepo  userDetailsRepo;

    public ResponseEntity<ApiResponseDto> addPosts(AddPostDto addPostDto){
        UserDetails userDetails = userDetailsRepo.findByEmail(addPostDto.getEmail());
        Post post = Post.builder()
                .caption(addPostDto.getCaption())
                .image(addPostDto.getImage())
                .title(addPostDto.getTitle())
                .userDetails(userDetails)
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
        List<Post> posts = postRepo.findAllByDeletedAtIsNullOrderByCreatedAtDesc();
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Post fetched")
                .data(posts)
                .build();

        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }

    public ResponseEntity<ApiResponseDto> deletePost(Long id) {
        Optional<Post> postOptional = postRepo.findById(id);
        Post postData = postOptional.get();
        postData.setDeletedAt(Timestamp.valueOf(LocalDateTime.now()));
        postData = postRepo.save(postData);
        ApiResponseDto apiResponseDto = ApiResponseDto.builder()
                .status(HttpStatus.OK)
                .message("Post Deleted")
                .data(postData)
                .build();

        return new ResponseEntity<>(apiResponseDto, HttpStatus.OK);
    }
}
