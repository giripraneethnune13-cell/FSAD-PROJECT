package com.portfolio.service;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.dto.MilestoneDTO;
import com.portfolio.dto.FeedbackDTO;
import com.portfolio.dto.MediaFileDTO;
import com.portfolio.entity.*;
import com.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    public List<ProjectDTO> getProjectsByStudent(Long studentId) {
        return projectRepository.findByStudentIdOrderByCreatedAtDesc(studentId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return toDetailDTO(project);
    }

    public ProjectDTO createProject(ProjectDTO dto, Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Project project = Project.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .technologies(dto.getTechnologies())
                .tags(dto.getTags())
                .githubUrl(dto.getGithubUrl())
                .liveUrl(dto.getLiveUrl())
                .thumbnailUrl(dto.getThumbnailUrl())
                .status(dto.getStatus() != null ? Project.Status.valueOf(dto.getStatus()) : Project.Status.IN_PROGRESS)
                .student(student)
                .build();

        return toDTO(projectRepository.save(project));
    }

    public ProjectDTO updateProject(Long id, ProjectDTO dto, Long studentId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized to update this project");
        }

        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setTechnologies(dto.getTechnologies());
        project.setTags(dto.getTags());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveUrl(dto.getLiveUrl());
        project.setThumbnailUrl(dto.getThumbnailUrl());
        if (dto.getStatus() != null) {
            project.setStatus(Project.Status.valueOf(dto.getStatus()));
        }

        return toDTO(projectRepository.save(project));
    }

    public void deleteProject(Long id, Long userId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getStudent().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this project");
        }

        projectRepository.delete(project);
    }

    private ProjectDTO toDTO(Project project) {
        List<Milestone> milestones = milestoneRepository.findByProjectIdOrderByDueDateAsc(project.getId());
        int completed = (int) milestones.stream().filter(Milestone::isCompleted).count();

        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .technologies(project.getTechnologies())
                .tags(project.getTags())
                .githubUrl(project.getGithubUrl())
                .liveUrl(project.getLiveUrl())
                .thumbnailUrl(project.getThumbnailUrl())
                .status(project.getStatus().name())
                .studentId(project.getStudent().getId())
                .studentName(project.getStudent().getFullName())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .milestoneCount(milestones.size())
                .completedMilestones(completed)
                .build();
    }

    private ProjectDTO toDetailDTO(Project project) {
        ProjectDTO dto = toDTO(project);
        List<Milestone> milestones = milestoneRepository.findByProjectIdOrderByDueDateAsc(project.getId());
        dto.setMilestones(milestones.stream().map(m -> MilestoneDTO.builder()
                .id(m.getId()).title(m.getTitle()).description(m.getDescription())
                .dueDate(m.getDueDate()).completed(m.isCompleted())
                .completedAt(m.getCompletedAt()).projectId(m.getProject().getId())
                .build()).collect(Collectors.toList()));
        dto.setFeedbacks(project.getFeedbacks().stream().map(f -> FeedbackDTO.builder()
                .id(f.getId()).comment(f.getComment()).rating(f.getRating())
                .adminId(f.getAdmin().getId()).adminName(f.getAdmin().getFullName())
                .projectId(f.getProject().getId()).createdAt(f.getCreatedAt())
                .build()).collect(Collectors.toList()));
        dto.setMediaFiles(project.getMediaFiles().stream().map(mf -> MediaFileDTO.builder()
                .id(mf.getId()).fileName(mf.getFileName()).fileType(mf.getFileType())
                .filePath(mf.getFilePath()).fileSize(mf.getFileSize())
                .projectId(mf.getProject().getId()).uploadedAt(mf.getUploadedAt())
                .build()).collect(Collectors.toList()));
        return dto;
    }
}
