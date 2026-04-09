package com.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String bio;
    private String avatarUrl;
    private String department;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();

    public User() {}

    public User(Long id, String fullName, String email, String password, Role role, String bio, String avatarUrl, String department) {
        this.id = id; this.fullName = fullName; this.email = email; this.password = password;
        this.role = role; this.bio = bio; this.avatarUrl = avatarUrl; this.department = department;
    }

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }

    // Builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String fullName; private String email;
        private String password; private Role role; private String bio;
        private String avatarUrl; private String department;
        public Builder id(Long id) { this.id = id; return this; }
        public Builder fullName(String v) { this.fullName = v; return this; }
        public Builder email(String v) { this.email = v; return this; }
        public Builder password(String v) { this.password = v; return this; }
        public Builder role(Role v) { this.role = v; return this; }
        public Builder bio(String v) { this.bio = v; return this; }
        public Builder avatarUrl(String v) { this.avatarUrl = v; return this; }
        public Builder department(String v) { this.department = v; return this; }
        public User build() {
            User u = new User(); u.id = id; u.fullName = fullName; u.email = email;
            u.password = password; u.role = role; u.bio = bio; u.avatarUrl = avatarUrl;
            u.department = department; return u;
        }
    }

    public enum Role { STUDENT, ADMIN }
}
