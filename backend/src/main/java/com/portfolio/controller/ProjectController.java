package com.portfolio.controller;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.entity.User;
import com.portfolio.service.ProjectService;
import com.portfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ProjectDTO>> getMyProjects(Authentication auth) {
        User user = userService.getUserEntityByEmail(auth.getName());
        return ResponseEntity.ok(projectService.getProjectsByStudent(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO dto, Authentication auth) {
        User user = userService.getUserEntityByEmail(auth.getName());
        return ResponseEntity.ok(projectService.createProject(dto, user.getId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO dto, Authentication auth) {
        User user = userService.getUserEntityByEmail(auth.getName());
        return ResponseEntity.ok(projectService.updateProject(id, dto, user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id, Authentication auth) {
        User user = userService.getUserEntityByEmail(auth.getName());
        projectService.deleteProject(id, user.getId());
        return ResponseEntity.ok().build();
    }
}
