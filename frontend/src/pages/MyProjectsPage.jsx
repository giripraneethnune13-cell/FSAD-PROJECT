import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProjects, deleteProject } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import { FiPlusCircle } from 'react-icons/fi';
import './Dashboard.css';

const MyProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await getMyProjects();
      setProjects(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page page-container" id="my-projects-page">
      <div className="section-header">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>My Projects</h1>
          <p>Manage and organize all your projects</p>
        </div>
        <Link to="/projects/new" className="btn-primary">
          <FiPlusCircle /> New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state glass-card">
          <h3>No projects yet</h3>
          <p>Create your first project to get started.</p>
          <Link to="/projects/new" className="btn-primary"><FiPlusCircle /> Create Project</Link>
        </div>
      ) : (
        <div className="grid-3">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjectsPage;
