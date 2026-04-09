import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPortfolioUser, getPortfolioProjects } from '../api/api';
import ProjectCard from '../components/ProjectCard';
import { FiMail, FiBookOpen } from 'react-icons/fi';
import './Dashboard.css';

const PublicPortfolioPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, pRes] = await Promise.all([
          getPortfolioUser(userId),
          getPortfolioProjects(userId),
        ]);
        setUser(uRes.data);
        setProjects(pRes.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [userId]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!user) return <div className="empty-state"><h3>Portfolio not found</h3></div>;

  return (
    <div className="portfolio-page" id="public-portfolio-page">
      <div className="glass-card portfolio-header animate-fade-in-up">
        <div className="portfolio-avatar">{user.fullName?.charAt(0)}</div>
        <h1 className="portfolio-name">{user.fullName}</h1>
        {user.department && <p className="portfolio-dept"><FiBookOpen /> {user.department}</p>}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
          <FiMail /> {user.email}
        </p>
        {user.bio && <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>{user.bio}</p>}
      </div>

      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1>Projects ({projects.length})</h1>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state glass-card"><h3>No projects yet</h3></div>
      ) : (
        <div className="grid-2">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
};

export default PublicPortfolioPage;
