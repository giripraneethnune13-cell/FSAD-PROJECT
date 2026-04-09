package com.portfolio.controller;

import com.portfolio.dto.MilestoneDTO;
import com.portfolio.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<MilestoneDTO>> getMilestones(@PathVariable Long projectId) {
        return ResponseEntity.ok(milestoneService.getMilestonesByProject(projectId));
    }

    @PostMapping
    public ResponseEntity<MilestoneDTO> createMilestone(@RequestBody MilestoneDTO dto) {
        return ResponseEntity.ok(milestoneService.createMilestone(dto));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<MilestoneDTO> toggleComplete(@PathVariable Long id) {
        return ResponseEntity.ok(milestoneService.toggleComplete(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long id) {
        milestoneService.deleteMilestone(id);
        return ResponseEntity.ok().build();
    }
}
