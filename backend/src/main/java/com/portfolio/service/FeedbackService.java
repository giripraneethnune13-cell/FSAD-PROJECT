package com.portfolio.service;

import com.portfolio.dto.FeedbackDTO;
import com.portfolio.entity.Feedback;
import com.portfolio.entity.Project;
import com.portfolio.entity.User;
import com.portfolio.repository.FeedbackRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public List<FeedbackDTO> getFeedbackByProject(Long projectId) {
        return feedbackRepository.findByProjectIdOrderByCreatedAtDesc(projectId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public FeedbackDTO createFeedback(FeedbackDTO dto, Long adminId) {
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Feedback feedback = Feedback.builder()
                .comment(dto.getComment())
                .rating(dto.getRating())
                .admin(admin)
                .project(project)
                .build();

        return toDTO(feedbackRepository.save(feedback));
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    private FeedbackDTO toDTO(Feedback f) {
        return FeedbackDTO.builder()
                .id(f.getId())
                .comment(f.getComment())
                .rating(f.getRating())
                .adminId(f.getAdmin().getId())
                .adminName(f.getAdmin().getFullName())
                .projectId(f.getProject().getId())
                .createdAt(f.getCreatedAt())
                .build();
    }
}
