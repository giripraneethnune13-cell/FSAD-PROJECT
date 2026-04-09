package com.portfolio.repository;

import com.portfolio.entity.MediaFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {
    List<MediaFile> findByProjectId(Long projectId);
}
