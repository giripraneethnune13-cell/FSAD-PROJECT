import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import './Dashboard.css';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects().then(res => { setProjects(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL' ? projects : projects.filter(p => p.status === filter);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page page-container" id="admin-projects-page">
      <div className="page-header">
        <h1>All Student Projects</h1>
        <p>Review and provide feedback on student submissions</p>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {['ALL', 'IN_PROGRESS', 'COMPLETED', 'UNDER_REVIEW', 'ARCHIVED'].map(s => (
          <button key={s}
            className={filter === s ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            onClick={() => setFilter(s)}>
            {s === 'ALL' ? 'All' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state glass-card"><h3>No projects found</h3></div>
      ) : (
        <div className="grid-3">
          {filtered.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
};

export default AdminProjectsPage;
