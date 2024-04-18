package com.courseRecommendation.courseRecommendation;

import com.courseRecommendation.courseRecommendation.model.EntranceExams;
import com.courseRecommendation.courseRecommendation.model.Scholarship;
import com.courseRecommendation.courseRecommendation.repository.EntranceExamsRepo;
import com.courseRecommendation.courseRecommendation.repository.ScholarshipRepo;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
@RequiredArgsConstructor
public class CourseRecommendationApplication {

	private final ScholarshipRepo scholarshipRepo;
	private final EntranceExamsRepo entranceExamsRepo;

	public static void main(String[] args) {
		SpringApplication.run(CourseRecommendationApplication.class, args);
	}

	@PostConstruct
	public void init() {
		List<Scholarship> scholarships = scholarshipRepo.findAll();
		System.out.println(scholarships);
		List<EntranceExams> entranceExams = entranceExamsRepo.findAll();
		System.out.println(entranceExams);
	}
}


