import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents } from '../api/api';
import { FiUser, FiExternalLink } from 'react-icons/fi';
import './Dashboard.css';

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllStudents().then(res => { setStudents(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page page-container" id="admin-students-page">
      <div className="page-header">
        <h1>Students</h1>
        <p>Manage and view student portfolios</p>
      </div>

      {students.length === 0 ? (
        <div className="empty-state glass-card"><h3>No students registered yet</h3></div>
      ) : (
        <div className="students-grid">
          {students.map(s => (
            <div key={s.id} className="glass-card student-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700
                }}>
                  {s.fullName?.charAt(0)}
                </div>
                <div>
                  <div className="student-card-name">{s.fullName}</div>
                  <div className="student-card-email">{s.email}</div>
                </div>
              </div>
              {s.department && <div className="student-card-dept">📚 {s.department}</div>}
              <div className="student-card-projects">{s.projectCount} project{s.projectCount !== 1 ? 's' : ''}</div>
              <Link to={`/portfolio/${s.id}`} className="btn-secondary" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                <FiExternalLink /> View Portfolio
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudentsPage;
