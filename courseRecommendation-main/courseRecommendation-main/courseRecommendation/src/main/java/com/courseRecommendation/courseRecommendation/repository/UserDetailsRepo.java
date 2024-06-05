package com.courseRecommendation.courseRecommendation.repository;

import com.courseRecommendation.courseRecommendation.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepo extends JpaRepository<UserDetails, Long> {

    UserDetails findByEmail(String email);

    UserDetails findByEmailAndCode(String email, Long code);
}
