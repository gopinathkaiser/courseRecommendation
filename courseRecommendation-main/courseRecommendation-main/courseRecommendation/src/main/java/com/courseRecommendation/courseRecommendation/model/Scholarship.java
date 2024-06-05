package com.courseRecommendation.courseRecommendation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sname;
    private String authority;
    private String aname;
    private String category;
    private String spass;
    private String cutoff;
    private String state;
    private String applbranchtotal;
    private String applbranch;
    private String incomelimit;
    private String benefit;
    private String link;
    private String renewpolicy;
    private String docrequired;

}
