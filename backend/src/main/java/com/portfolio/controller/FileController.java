package com.portfolio.controller;

import com.portfolio.dto.MediaFileDTO;
import com.portfolio.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("projectId") Long projectId) {
        try {
            MediaFileDTO dto = fileStorageService.uploadFile(file, projectId);
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Upload failed: " + e.getMessage()));
        }
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) throws IOException {
        Resource resource = fileStorageService.downloadFile(fileName);

        // Detect content type from file
        String contentType = "application/octet-stream";
        try {
            contentType = Files.probeContentType(Paths.get(fileName));
            if (contentType == null) contentType = "application/octet-stream";
        } catch (Exception ignored) {}

        // Inline for images/videos/pdf; attachment for others
        String disposition = contentType.startsWith("image/") || contentType.startsWith("video/")
                || contentType.equals("application/pdf")
                ? "inline" : "attachment";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        disposition + "; filename=\"" + resource.getFilename() + "\"")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .body(resource);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<MediaFileDTO>> getFilesByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(fileStorageService.getFilesByProject(projectId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) throws IOException {
        fileStorageService.deleteFile(id);
        return ResponseEntity.ok().build();
    }
}
