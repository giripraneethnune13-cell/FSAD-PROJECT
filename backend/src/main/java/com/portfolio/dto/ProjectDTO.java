package com.portfolio.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private String technologies;
    private String tags;
    private String githubUrl;
    private String liveUrl;
    private String thumbnailUrl;
    private String status;
    private Long studentId;
    private String studentName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int milestoneCount;
    private int completedMilestones;
    private List<MilestoneDTO> milestones;
    private List<FeedbackDTO> feedbacks;
    private List<MediaFileDTO> mediaFiles;

    public ProjectDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public int getMilestoneCount() { return milestoneCount; }
    public void setMilestoneCount(int milestoneCount) { this.milestoneCount = milestoneCount; }
    public int getCompletedMilestones() { return completedMilestones; }
    public void setCompletedMilestones(int completedMilestones) { this.completedMilestones = completedMilestones; }
    public List<MilestoneDTO> getMilestones() { return milestones; }
    public void setMilestones(List<MilestoneDTO> milestones) { this.milestones = milestones; }
    public List<FeedbackDTO> getFeedbacks() { return feedbacks; }
    public void setFeedbacks(List<FeedbackDTO> feedbacks) { this.feedbacks = feedbacks; }
    public List<MediaFileDTO> getMediaFiles() { return mediaFiles; }
    public void setMediaFiles(List<MediaFileDTO> mediaFiles) { this.mediaFiles = mediaFiles; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id, studentId; private String title, description, technologies, tags;
        private String githubUrl, liveUrl, thumbnailUrl, status, studentName;
        private LocalDateTime createdAt, updatedAt; private int milestoneCount, completedMilestones;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder title(String v) { this.title = v; return this; }
        public Builder description(String v) { this.description = v; return this; }
        public Builder technologies(String v) { this.technologies = v; return this; }
        public Builder tags(String v) { this.tags = v; return this; }
        public Builder githubUrl(String v) { this.githubUrl = v; return this; }
        public Builder liveUrl(String v) { this.liveUrl = v; return this; }
        public Builder thumbnailUrl(String v) { this.thumbnailUrl = v; return this; }
        public Builder status(String v) { this.status = v; return this; }
        public Builder studentId(Long v) { this.studentId = v; return this; }
        public Builder studentName(String v) { this.studentName = v; return this; }
        public Builder createdAt(LocalDateTime v) { this.createdAt = v; return this; }
        public Builder updatedAt(LocalDateTime v) { this.updatedAt = v; return this; }
        public Builder milestoneCount(int v) { this.milestoneCount = v; return this; }
        public Builder completedMilestones(int v) { this.completedMilestones = v; return this; }
        public ProjectDTO build() {
            ProjectDTO p = new ProjectDTO(); p.id = id; p.title = title; p.description = description;
            p.technologies = technologies; p.tags = tags; p.githubUrl = githubUrl; p.liveUrl = liveUrl;
            p.thumbnailUrl = thumbnailUrl; p.status = status; p.studentId = studentId;
            p.studentName = studentName; p.createdAt = createdAt; p.updatedAt = updatedAt;
            p.milestoneCount = milestoneCount; p.completedMilestones = completedMilestones; return p;
        }
    }
}
