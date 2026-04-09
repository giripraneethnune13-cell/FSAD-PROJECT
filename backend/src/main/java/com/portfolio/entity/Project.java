package com.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String technologies;

    private String tags;
    private String githubUrl;
    private String liveUrl;
    private String thumbnailUrl;

    @Enumerated(EnumType.STRING)
    private Status status = Status.IN_PROGRESS;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Milestone> milestones = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feedback> feedbacks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaFile> mediaFiles = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Project() {}

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = LocalDateTime.now(); }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    // Getters and Setters
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
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public List<Milestone> getMilestones() { return milestones; }
    public void setMilestones(List<Milestone> milestones) { this.milestones = milestones; }
    public List<Feedback> getFeedbacks() { return feedbacks; }
    public void setFeedbacks(List<Feedback> feedbacks) { this.feedbacks = feedbacks; }
    public List<MediaFile> getMediaFiles() { return mediaFiles; }
    public void setMediaFiles(List<MediaFile> mediaFiles) { this.mediaFiles = mediaFiles; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String title; private String description;
        private String technologies; private String tags; private String githubUrl;
        private String liveUrl; private String thumbnailUrl; private Status status = Status.IN_PROGRESS;
        private User student;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder title(String v) { this.title = v; return this; }
        public Builder description(String v) { this.description = v; return this; }
        public Builder technologies(String v) { this.technologies = v; return this; }
        public Builder tags(String v) { this.tags = v; return this; }
        public Builder githubUrl(String v) { this.githubUrl = v; return this; }
        public Builder liveUrl(String v) { this.liveUrl = v; return this; }
        public Builder thumbnailUrl(String v) { this.thumbnailUrl = v; return this; }
        public Builder status(Status v) { this.status = v; return this; }
        public Builder student(User v) { this.student = v; return this; }
        public Project build() {
            Project p = new Project(); p.id = id; p.title = title; p.description = description;
            p.technologies = technologies; p.tags = tags; p.githubUrl = githubUrl;
            p.liveUrl = liveUrl; p.thumbnailUrl = thumbnailUrl; p.status = status; p.student = student;
            return p;
        }
    }

    public enum Status { IN_PROGRESS, COMPLETED, UNDER_REVIEW, ARCHIVED }
}
