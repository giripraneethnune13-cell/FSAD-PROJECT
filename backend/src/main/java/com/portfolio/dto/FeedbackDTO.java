package com.portfolio.dto;

import java.time.LocalDateTime;

public class FeedbackDTO {
    private Long id;
    private String comment;
    private Integer rating;
    private Long adminId;
    private String adminName;
    private Long projectId;
    private LocalDateTime createdAt;

    public FeedbackDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }
    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }
    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id, adminId, projectId; private String comment, adminName;
        private Integer rating; private LocalDateTime createdAt;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder comment(String v) { this.comment = v; return this; }
        public Builder rating(Integer v) { this.rating = v; return this; }
        public Builder adminId(Long v) { this.adminId = v; return this; }
        public Builder adminName(String v) { this.adminName = v; return this; }
        public Builder projectId(Long v) { this.projectId = v; return this; }
        public Builder createdAt(LocalDateTime v) { this.createdAt = v; return this; }
        public FeedbackDTO build() {
            FeedbackDTO f = new FeedbackDTO(); f.id = id; f.comment = comment; f.rating = rating;
            f.adminId = adminId; f.adminName = adminName; f.projectId = projectId; f.createdAt = createdAt;
            return f;
        }
    }
}
