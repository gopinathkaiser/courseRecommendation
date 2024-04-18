package com.courseRecommendation.courseRecommendation;

import com.courseRecommendation.courseRecommendation.model.EntranceExams;
import com.courseRecommendation.courseRecommendation.model.Scholarship;
import com.courseRecommendation.courseRecommendation.model.UserDetails;
import com.courseRecommendation.courseRecommendation.repository.EntranceExamsRepo;
import com.courseRecommendation.courseRecommendation.repository.ScholarshipRepo;
import com.courseRecommendation.courseRecommendation.repository.UserDetailsRepo;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
@RequiredArgsConstructor
public class CourseRecommendationApplication {

	private final ScholarshipRepo scholarshipRepo;
	private final EntranceExamsRepo entranceExamsRepo;
	private final UserDetailsRepo userDetailsRepo;
	private final PasswordEncoder passwordEncoder;


	public static void main(String[] args) {
		SpringApplication.run(CourseRecommendationApplication.class, args);
	}

	@PostConstruct
	public void init() {
		UserDetails userDetails = userDetailsRepo.findByEmail("admin@gmail.com");
		if(userDetails == null) {
			UserDetails userData = UserDetails.builder()
					.username("admin")
					.email("admin@gmail.com")
					.password(passwordEncoder.encode("admin"))
					.build();
			userDetailsRepo.save(userData);
		}
	}
}


