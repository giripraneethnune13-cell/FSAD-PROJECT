package com.portfolio.dto;

import java.time.LocalDateTime;

public class MediaFileDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private String filePath;
    private Long fileSize;
    private Long projectId;
    private LocalDateTime uploadedAt;

    public MediaFileDTO() {}

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
    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private Long id, projectId, fileSize; private String fileName, fileType, filePath;
        private LocalDateTime uploadedAt;
        public Builder id(Long v) { this.id = v; return this; }
        public Builder fileName(String v) { this.fileName = v; return this; }
        public Builder fileType(String v) { this.fileType = v; return this; }
        public Builder filePath(String v) { this.filePath = v; return this; }
        public Builder fileSize(Long v) { this.fileSize = v; return this; }
        public Builder projectId(Long v) { this.projectId = v; return this; }
        public Builder uploadedAt(LocalDateTime v) { this.uploadedAt = v; return this; }
        public MediaFileDTO build() {
            MediaFileDTO m = new MediaFileDTO(); m.id = id; m.fileName = fileName; m.fileType = fileType;
            m.filePath = filePath; m.fileSize = fileSize; m.projectId = projectId; m.uploadedAt = uploadedAt;
            return m;
        }
    }
}
