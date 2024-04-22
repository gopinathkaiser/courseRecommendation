package com.courseRecommendation.courseRecommendation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(name = "LONG_TEXT", columnDefinition="TEXT")
    private String caption;
    @Column(columnDefinition="text", length=10485760)
    private String image;
    @ManyToOne
    @JsonIgnore
    private UserDetails userDetails;
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Timestamp createdAt;
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Timestamp updatedAt;
}
