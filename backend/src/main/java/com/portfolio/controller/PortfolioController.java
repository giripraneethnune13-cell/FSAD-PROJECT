package com.portfolio.controller;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.service.ProjectService;
import com.portfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getPortfolioUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/{userId}/projects")
    public ResponseEntity<List<ProjectDTO>> getPortfolioProjects(@PathVariable Long userId) {
        return ResponseEntity.ok(projectService.getProjectsByStudent(userId));
    }
}
