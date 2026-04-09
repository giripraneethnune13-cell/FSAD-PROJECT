package com.portfolio.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String fullName;
    private String role;
    private Long userId;

    public AuthResponse() {}

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String token, email, fullName, role; private Long userId;
        public Builder token(String v) { this.token = v; return this; }
        public Builder email(String v) { this.email = v; return this; }
        public Builder fullName(String v) { this.fullName = v; return this; }
        public Builder role(String v) { this.role = v; return this; }
        public Builder userId(Long v) { this.userId = v; return this; }
        public AuthResponse build() {
            AuthResponse r = new AuthResponse(); r.token = token; r.email = email;
            r.fullName = fullName; r.role = role; r.userId = userId; return r;
        }
    }
}
