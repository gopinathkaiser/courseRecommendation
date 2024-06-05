package com.courseRecommendation.courseRecommendation.repository;


import com.courseRecommendation.courseRecommendation.model.EntranceExams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntranceExamsRepo extends JpaRepository<EntranceExams,Long> {
}
