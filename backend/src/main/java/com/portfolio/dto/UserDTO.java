package com.portfolio.dto;

public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String bio;
    private String avatarUrl;
    private String department;
    private int projectCount;

    public UserDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public int getProjectCount() { return projectCount; }
    public void setProjectCount(int projectCount) { this.projectCount = projectCount; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String fullName, email, role, bio, avatarUrl, department;
        private int projectCount;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder fullName(String v) { this.fullName = v; return this; }
        public Builder email(String v) { this.email = v; return this; }
        public Builder role(String v) { this.role = v; return this; }
        public Builder bio(String v) { this.bio = v; return this; }
        public Builder avatarUrl(String v) { this.avatarUrl = v; return this; }
        public Builder department(String v) { this.department = v; return this; }
        public Builder projectCount(int v) { this.projectCount = v; return this; }
        public UserDTO build() {
            UserDTO u = new UserDTO(); u.id = id; u.fullName = fullName; u.email = email;
            u.role = role; u.bio = bio; u.avatarUrl = avatarUrl; u.department = department;
            u.projectCount = projectCount; return u;
        }
    }
}
