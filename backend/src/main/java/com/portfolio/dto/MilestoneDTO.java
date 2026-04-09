package com.portfolio.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MilestoneDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
    private LocalDateTime completedAt;
    private Long projectId;

    public MilestoneDTO() {}

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
    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id, projectId; private String title, description;
        private LocalDate dueDate; private boolean completed; private LocalDateTime completedAt;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder title(String v) { this.title = v; return this; }
        public Builder description(String v) { this.description = v; return this; }
        public Builder dueDate(LocalDate v) { this.dueDate = v; return this; }
        public Builder completed(boolean v) { this.completed = v; return this; }
        public Builder completedAt(LocalDateTime v) { this.completedAt = v; return this; }
        public Builder projectId(Long v) { this.projectId = v; return this; }
        public MilestoneDTO build() {
            MilestoneDTO m = new MilestoneDTO(); m.id = id; m.title = title; m.description = description;
            m.dueDate = dueDate; m.completed = completed; m.completedAt = completedAt; m.projectId = projectId;
            return m;
        }
    }
}
