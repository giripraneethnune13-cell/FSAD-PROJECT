import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getProjectById, getMilestones, getFeedback, getFilesByProject,
  toggleMilestone, createMilestone, deleteMilestone,
  createFeedback, deleteProject
} from '../api/api';
import MediaUploader from '../components/MediaUploader';
import {
  FiEdit, FiTrash2, FiGithub, FiExternalLink,
  FiUser, FiCalendar, FiCheck, FiPlus, FiStar, FiX, FiTarget
} from 'react-icons/fi';
import './Dashboard.css';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msForm, setMsForm] = useState({ title: '', description: '', dueDate: '' });
  const [fbForm, setFbForm] = useState({ comment: '', rating: 5 });

  const fetchAll = async () => {
    try {
      const [pRes, mRes, fRes, fiRes] = await Promise.all([
        getProjectById(id), getMilestones(id), getFeedback(id), getFilesByProject(id),
      ]);
      setProject(pRes.data);
      setMilestones(mRes.data);
      setFeedbacks(fRes.data);
      setFiles(fiRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, [id]);

  const refreshFiles = async () => {
    const fiRes = await getFilesByProject(id);
    setFiles(fiRes.data);
  };

  const handleToggleMilestone = async (msId) => {
    await toggleMilestone(msId);
    const mRes = await getMilestones(id);
    setMilestones(mRes.data);
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    await createMilestone({ ...msForm, projectId: Number(id) });
    setMsForm({ title: '', description: '', dueDate: '' });
    const mRes = await getMilestones(id);
    setMilestones(mRes.data);
  };

  const handleDeleteMilestone = async (msId) => {
    await deleteMilestone(msId);
    const mRes = await getMilestones(id);
    setMilestones(mRes.data);
  };

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    await createFeedback({ ...fbForm, projectId: Number(id) });
    setFbForm({ comment: '', rating: 5 });
    const fRes = await getFeedback(id);
    setFeedbacks(fRes.data);
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Delete this project permanently?')) {
      await deleteProject(id);
      navigate('/projects');
    }
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!project) return <div className="empty-state"><h3>Project not found</h3></div>;

  const isOwner = user?.userId === project.studentId;
  const completedMs = milestones.filter(m => m.completed).length;
  const progress = milestones.length > 0 ? Math.round((completedMs / milestones.length) * 100) : 0;

  const statusBadge = {
    IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed',
    UNDER_REVIEW: 'badge-review', ARCHIVED: 'badge-archived',
  };

  return (
    <div className="project-detail page-container" id="project-detail-page">
      {/* Header */}
      <div className="project-detail-header">
        <div>
          <h1>{project.title}</h1>
          <div className="project-detail-meta">
            <span className={`badge ${statusBadge[project.status]}`}>{project.status?.replace('_', ' ')}</span>
            <span className="meta-item"><FiUser /> {project.studentName}</span>
            <span className="meta-item"><FiCalendar /> {new Date(project.createdAt).toLocaleDateString()}</span>
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="meta-item"><FiGithub /> GitHub</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="meta-item"><FiExternalLink /> Live Demo</a>}
          </div>
        </div>
        {isOwner && (
          <div className="project-detail-actions">
            <Link to={`/projects/edit/${id}`} className="btn-secondary"><FiEdit /> Edit</Link>
            <button className="btn-danger" onClick={handleDeleteProject}><FiTrash2 /> Delete</button>
          </div>
        )}
      </div>

      {/* Tags */}
      {project.technologies && (
        <div className="project-card-tags" style={{ marginBottom: 20 }}>
          {project.technologies.split(',').map((t, i) => <span key={i} className="tag">{t.trim()}</span>)}
        </div>
      )}

      {/* Description */}
      <p className="project-detail-desc">{project.description}</p>

      {/* Progress Bar */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
        <div className="progress-info">
          <span>Overall Progress — {completedMs}/{milestones.length} milestones</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar-track" style={{ height: 10, borderRadius: 5 }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, borderRadius: 5 }}></div>
        </div>
      </div>

      {/* Milestones + Feedback */}
      <div className="detail-sections">
        {/* Milestones */}
        <div className="glass-card detail-section">
          <h3><FiTarget style={{ marginRight: 8 }} />Milestones ({completedMs}/{milestones.length})</h3>
          <div className="milestone-timeline">
            {milestones.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No milestones yet</p>}
            {milestones.map(ms => (
              <div key={ms.id} className="milestone-item">
                <div className={`milestone-dot ${ms.completed ? 'completed' : ''}`}
                  onClick={() => isOwner && handleToggleMilestone(ms.id)}>
                  {ms.completed && <FiCheck />}
                </div>
                <div className="milestone-info">
                  <div className={`milestone-title ${ms.completed ? 'completed' : ''}`}>{ms.title}</div>
                  {ms.description && <div className="milestone-desc">{ms.description}</div>}
                  {ms.dueDate && <div className="milestone-due">Due: {ms.dueDate}</div>}
                </div>
                {isOwner && (
                  <button className="milestone-delete" onClick={() => handleDeleteMilestone(ms.id)}><FiX /></button>
                )}
              </div>
            ))}
          </div>
          {isOwner && (
            <form className="milestone-form glass-card" onSubmit={handleAddMilestone}>
              <input className="input-field" placeholder="Milestone title" value={msForm.title}
                onChange={e => setMsForm({...msForm, title: e.target.value})} required />
              <input className="input-field" placeholder="Description (optional)" value={msForm.description}
                onChange={e => setMsForm({...msForm, description: e.target.value})} />
              <div className="milestone-form-row">
                <input type="date" className="input-field" value={msForm.dueDate}
                  onChange={e => setMsForm({...msForm, dueDate: e.target.value})} />
                <button type="submit" className="btn-primary"><FiPlus /> Add</button>
              </div>
            </form>
          )}
        </div>

        {/* Feedback */}
        <div className="glass-card detail-section">
          <h3><FiStar style={{ marginRight: 8 }} />Feedback ({feedbacks.length})</h3>
          <div className="feedback-list">
            {feedbacks.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No feedback yet</p>}
            {feedbacks.map(fb => (
              <div key={fb.id} className="glass-card feedback-item">
                <div className="feedback-header">
                  <span className="feedback-admin">{fb.adminName}</span>
                  <span className="feedback-date">{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="feedback-rating">{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</div>
                <p className="feedback-comment">{fb.comment}</p>
              </div>
            ))}
          </div>
          {isAdmin() && (
            <form className="feedback-form" onSubmit={handleAddFeedback}>
              <textarea className="textarea-field" placeholder="Write your feedback..." rows={3}
                value={fbForm.comment} onChange={e => setFbForm({...fbForm, comment: e.target.value})} required />
              <div className="feedback-form-row">
                <select className="select-field" value={fbForm.rating}
                  onChange={e => setFbForm({...fbForm, rating: Number(e.target.value)})}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                </select>
                <button type="submit" className="btn-primary"><FiPlus /> Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Media Uploader */}
      <div className="glass-card detail-section" style={{ marginTop: 24 }}>
        <MediaUploader
          files={files}
          projectId={id}
          isOwner={isOwner}
          onFilesChange={refreshFiles}
        />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
