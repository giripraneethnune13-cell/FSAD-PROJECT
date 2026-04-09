package com.portfolio.service;

import com.portfolio.dto.MilestoneDTO;
import com.portfolio.entity.Milestone;
import com.portfolio.entity.Project;
import com.portfolio.repository.MilestoneRepository;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<MilestoneDTO> getMilestonesByProject(Long projectId) {
        return milestoneRepository.findByProjectIdOrderByDueDateAsc(projectId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public MilestoneDTO createMilestone(MilestoneDTO dto) {
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Milestone milestone = Milestone.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .project(project)
                .build();

        return toDTO(milestoneRepository.save(milestone));
    }

    public MilestoneDTO toggleComplete(Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone not found"));

        milestone.setCompleted(!milestone.isCompleted());
        milestone.setCompletedAt(milestone.isCompleted() ? LocalDateTime.now() : null);

        return toDTO(milestoneRepository.save(milestone));
    }

    public void deleteMilestone(Long id) {
        milestoneRepository.deleteById(id);
    }

    private MilestoneDTO toDTO(Milestone m) {
        return MilestoneDTO.builder()
                .id(m.getId())
                .title(m.getTitle())
                .description(m.getDescription())
                .dueDate(m.getDueDate())
                .completed(m.isCompleted())
                .completedAt(m.getCompletedAt())
                .projectId(m.getProject().getId())
                .build();
    }
}
