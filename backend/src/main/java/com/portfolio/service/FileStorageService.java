package com.portfolio.service;

import com.portfolio.dto.MediaFileDTO;
import com.portfolio.entity.MediaFile;
import com.portfolio.entity.Project;
import com.portfolio.repository.MediaFileRepository;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FileStorageService {

    // Allowed MIME types
    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"
    );
    private static final List<String> ALLOWED_VIDEO_TYPES = Arrays.asList(
            "video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo"
    );
    private static final List<String> ALLOWED_PDF_TYPES = List.of("application/pdf");

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Autowired
    private MediaFileRepository mediaFileRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public MediaFileDTO uploadFile(MultipartFile file, Long projectId) throws IOException {
        // Validate file type
        String contentType = file.getContentType();
        boolean allowed = ALLOWED_IMAGE_TYPES.contains(contentType)
                || ALLOWED_VIDEO_TYPES.contains(contentType)
                || ALLOWED_PDF_TYPES.contains(contentType);

        if (!allowed) {
            throw new IllegalArgumentException(
                "Unsupported file type: " + contentType + ". Only images, PDFs, and videos are allowed."
            );
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Create upload directory
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        // Generate unique filename preserving original extension
        String originalName = file.getOriginalFilename();
        String extension = (originalName != null && originalName.contains("."))
                ? originalName.substring(originalName.lastIndexOf("."))
                : "";
        String uniqueFileName = UUID.randomUUID() + extension;
        Path targetLocation = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Determine category
        String category = resolveCategory(contentType);

        MediaFile mediaFile = new MediaFile();
        mediaFile.setFileName(originalName);
        mediaFile.setFileType(contentType);
        mediaFile.setFilePath(uniqueFileName);
        mediaFile.setFileSize(file.getSize());
        mediaFile.setProject(project);

        mediaFile = mediaFileRepository.save(mediaFile);
        return toDTO(mediaFile);
    }

    public Resource downloadFile(String fileName) throws MalformedURLException {
        Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) return resource;
        throw new RuntimeException("File not found: " + fileName);
    }

    public List<MediaFileDTO> getFilesByProject(Long projectId) {
        return mediaFileRepository.findByProjectId(projectId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteFile(Long id) throws IOException {
        MediaFile mediaFile = mediaFileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
        Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(mediaFile.getFilePath());
        Files.deleteIfExists(filePath);
        mediaFileRepository.delete(mediaFile);
    }

    private String resolveCategory(String contentType) {
        if (ALLOWED_IMAGE_TYPES.contains(contentType)) return "IMAGE";
        if (ALLOWED_VIDEO_TYPES.contains(contentType)) return "VIDEO";
        if (ALLOWED_PDF_TYPES.contains(contentType)) return "PDF";
        return "OTHER";
    }

    private MediaFileDTO toDTO(MediaFile mf) {
        MediaFileDTO dto = new MediaFileDTO();
        dto.setId(mf.getId());
        dto.setFileName(mf.getFileName());
        dto.setFileType(mf.getFileType());
        dto.setFilePath(mf.getFilePath());
        dto.setFileSize(mf.getFileSize());
        dto.setProjectId(mf.getProject().getId());
        dto.setUploadedAt(mf.getUploadedAt());
        return dto;
    }
}
