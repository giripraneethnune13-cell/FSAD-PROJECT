import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyProjects } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import { FiPlusCircle, FiFolder, FiTarget, FiTrendingUp } from 'react-icons/fi';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyProjects();
        setProjects(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const totalMilestones = projects.reduce((s, p) => s + p.milestoneCount, 0);
  const completedMilestones = projects.reduce((s, p) => s + p.completedMilestones, 0);
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page page-container" id="student-dashboard">
      <div className="page-header">
        <h1>Welcome, {user?.fullName} 👋</h1>
        <p>Track your projects and build your portfolio</p>
      </div>

      <div className="grid-4 dashboard-stats">
        <div className="glass-card stat-card">
          <div className="stat-icon"><FiFolder /></div>
          <div className="stat-value">{projects.length}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon icon-green"><FiTrendingUp /></div>
          <div className="stat-value">{completedProjects}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon icon-cyan"><FiTarget /></div>
          <div className="stat-value">{totalMilestones}</div>
          <div className="stat-label">Milestones</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon icon-pink"><FiTarget /></div>
          <div className="stat-value">{completedMilestones}</div>
          <div className="stat-label">Milestones Done</div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <Link to="/projects/new" className="btn-primary">
            <FiPlusCircle /> New Project
          </Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty-state glass-card">
            <h3>No projects yet</h3>
            <p>Start by creating your first project to build your portfolio.</p>
            <Link to="/projects/new" className="btn-primary">
              <FiPlusCircle /> Create Project
            </Link>
          </div>
        ) : (
          <div className="grid-3">
            {projects.slice(0, 6).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
