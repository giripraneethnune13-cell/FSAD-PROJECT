import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiCalendar } from 'react-icons/fi';
import './ProjectCard.css';

const statusBadge = (status) => {
  const map = {
    IN_PROGRESS: { cls: 'badge-progress', label: 'In Progress' },
    COMPLETED: { cls: 'badge-completed', label: 'Completed' },
    UNDER_REVIEW: { cls: 'badge-review', label: 'Under Review' },
    ARCHIVED: { cls: 'badge-archived', label: 'Archived' },
  };
  return map[status] || map.IN_PROGRESS;
};

const ProjectCard = ({ project }) => {
  const badge = statusBadge(project.status);
  const progress = project.milestoneCount > 0
    ? Math.round((project.completedMilestones / project.milestoneCount) * 100)
    : 0;

  return (
    <div className="project-card glass-card animate-fade-in-up" id={`project-card-${project.id}`}>
      <div className="project-card-header">
        <div className="project-card-title-row">
          <Link to={`/projects/${project.id}`} className="project-card-title">
            {project.title}
          </Link>
          <span className={`badge ${badge.cls}`}>{badge.label}</span>
        </div>
        {project.studentName && (
          <span className="project-card-student">by {project.studentName}</span>
        )}
      </div>

      <p className="project-card-desc">
        {project.description ? project.description.substring(0, 120) + (project.description.length > 120 ? '...' : '') : 'No description'}
      </p>

      {project.technologies && (
        <div className="project-card-tags">
          {project.technologies.split(',').slice(0, 4).map((t, i) => (
            <span key={i} className="tag">{t.trim()}</span>
          ))}
        </div>
      )}

      <div className="project-card-progress">
        <div className="progress-info">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="project-card-footer">
        <span className="project-card-date">
          <FiCalendar />
          {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}
        </span>
        <div className="project-card-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="card-icon-link">
              <FiGithub />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="card-icon-link">
              <FiExternalLink />
            </a>
          )}
          <Link to={`/projects/${project.id}`} className="btn-primary card-view-btn">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
