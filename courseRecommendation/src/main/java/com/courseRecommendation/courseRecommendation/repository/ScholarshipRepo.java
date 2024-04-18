package com.courseRecommendation.courseRecommendation.repository;

import com.courseRecommendation.courseRecommendation.model.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepo extends JpaRepository<Scholarship, Long> {
}
