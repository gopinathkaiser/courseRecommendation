package com.courseRecommendation.courseRecommendation.repository;

import com.courseRecommendation.courseRecommendation.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, Long> {

    List<Post> findAllByOrderByCreatedAtDesc();
}
