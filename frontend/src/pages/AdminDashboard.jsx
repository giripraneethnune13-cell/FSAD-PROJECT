import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, getAllStudents } from '../api/api';
import { FiFolder, FiUsers, FiTrendingUp, FiEye } from 'react-icons/fi';
import './Dashboard.css';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, sRes] = await Promise.all([getAllProjects(), getAllStudents()]);
        setProjects(pRes.data);
        setStudents(sRes.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const completedCount = projects.filter(p => p.status === 'COMPLETED').length;
  const inProgressCount = projects.filter(p => p.status === 'IN_PROGRESS').length;

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page page-container" id="admin-dashboard">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage student projects and provide feedback</p>
      </div>

      <div className="grid-4 dashboard-stats">
        <div className="glass-card stat-card">
          <div className="stat-icon"><FiFolder /></div>
          <div className="stat-value">{projects.length}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon icon-green"><FiTrendingUp /></div>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon icon-cyan"><FiFolder /></div>
          <div className="stat-value">{inProgressCount}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon icon-pink"><FiUsers /></div>
          <div className="stat-value">{students.length}</div>
          <div className="stat-label">Students</div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <Link to="/admin/projects" className="btn-secondary"><FiEye /> View All</Link>
        </div>
        <div className="glass-card" style={{ overflow: 'auto' }}>
          <table className="admin-projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Student</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 8).map(p => {
                const progress = p.milestoneCount > 0 ? Math.round((p.completedMilestones / p.milestoneCount) * 100) : 0;
                const badgeClass = { IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed', UNDER_REVIEW: 'badge-review', ARCHIVED: 'badge-archived' };
                return (
                  <tr key={p.id}>
                    <td className="project-title-cell">{p.title}</td>
                    <td>{p.studentName}</td>
                    <td><span className={`badge ${badgeClass[p.status]}`}>{p.status?.replace('_', ' ')}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar-track" style={{ width: 80, height: 6 }}>
                          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem' }}>{progress}%</span>
                      </div>
                    </td>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="table-actions">
                      <Link to={`/projects/${p.id}`} className="btn-secondary">View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
