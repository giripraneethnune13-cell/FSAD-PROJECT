package com.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "milestones")
public class Milestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed = false;
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Milestone() {}

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String title; private String description;
        private LocalDate dueDate; private boolean completed = false;
        private LocalDateTime completedAt; private Project project;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder title(String v) { this.title = v; return this; }
        public Builder description(String v) { this.description = v; return this; }
        public Builder dueDate(LocalDate v) { this.dueDate = v; return this; }
        public Builder completed(boolean v) { this.completed = v; return this; }
        public Builder completedAt(LocalDateTime v) { this.completedAt = v; return this; }
        public Builder project(Project v) { this.project = v; return this; }
        public Milestone build() {
            Milestone m = new Milestone(); m.id = id; m.title = title; m.description = description;
            m.dueDate = dueDate; m.completed = completed; m.completedAt = completedAt; m.project = project;
            return m;
        }
    }
}
