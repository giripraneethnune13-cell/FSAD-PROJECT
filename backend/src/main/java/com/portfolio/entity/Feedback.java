package com.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;
    private Integer rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Feedback() {}

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public User getAdmin() { return admin; }
    public void setAdmin(User admin) { this.admin = admin; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String comment; private Integer rating;
        private User admin; private Project project;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder comment(String v) { this.comment = v; return this; }
        public Builder rating(Integer v) { this.rating = v; return this; }
        public Builder admin(User v) { this.admin = v; return this; }
        public Builder project(Project v) { this.project = v; return this; }
        public Feedback build() {
            Feedback f = new Feedback(); f.id = id; f.comment = comment; f.rating = rating;
            f.admin = admin; f.project = project; return f;
        }
    }
}
