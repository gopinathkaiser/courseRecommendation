package com.courseRecommendation.courseRecommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddPostDto {

    private String title;
    private String caption;
    private String image;
    private String email;
}
