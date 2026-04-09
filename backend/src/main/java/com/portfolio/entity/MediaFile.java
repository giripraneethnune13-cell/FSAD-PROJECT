package com.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "media_files")
public class MediaFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;
    private String fileType;

    @Column(nullable = false)
    private String filePath;
    private Long fileSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(updatable = false)
    private LocalDateTime uploadedAt;

    public MediaFile() {}

    @PrePersist
    protected void onCreate() { uploadedAt = LocalDateTime.now(); }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }

    // Builder
    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id; private String fileName; private String fileType;
        private String filePath; private Long fileSize; private Project project;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder fileName(String v) { this.fileName = v; return this; }
        public Builder fileType(String v) { this.fileType = v; return this; }
        public Builder filePath(String v) { this.filePath = v; return this; }
        public Builder fileSize(Long v) { this.fileSize = v; return this; }
        public Builder project(Project v) { this.project = v; return this; }
        public MediaFile build() {
            MediaFile m = new MediaFile(); m.id = id; m.fileName = fileName; m.fileType = fileType;
            m.filePath = filePath; m.fileSize = fileSize; m.project = project; return m;
        }
    }
}
