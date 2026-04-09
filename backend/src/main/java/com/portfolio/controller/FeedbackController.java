package com.portfolio.controller;

import com.portfolio.dto.FeedbackDTO;
import com.portfolio.entity.User;
import com.portfolio.service.FeedbackService;
import com.portfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedback(@PathVariable Long projectId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByProject(projectId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO dto, Authentication auth) {
        User admin = userService.getUserEntityByEmail(auth.getName());
        return ResponseEntity.ok(feedbackService.createFeedback(dto, admin.getId()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.ok().build();
    }
}
