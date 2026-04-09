import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject, getProjectById } from '../api/api';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import './Dashboard.css';

const CreateEditProjectPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', technologies: '',
    tags: '', githubUrl: '', liveUrl: '', thumbnailUrl: '', status: 'IN_PROGRESS'
  });

  useEffect(() => {
    if (isEdit) {
      getProjectById(id).then(res => {
        const p = res.data;
        setForm({
          title: p.title || '', description: p.description || '',
          technologies: p.technologies || '', tags: p.tags || '',
          githubUrl: p.githubUrl || '', liveUrl: p.liveUrl || '',
          thumbnailUrl: p.thumbnailUrl || '', status: p.status || 'IN_PROGRESS'
        });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateProject(id, form);
      } else {
        await createProject(form);
      }
      navigate('/projects');
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="project-form-page page-container" id="create-edit-project-page">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Project' : 'Create New Project'}</h1>
        <p>{isEdit ? 'Update your project details' : 'Fill in the details to add to your portfolio'}</p>
      </div>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Title *</label>
          <input className="input-field" placeholder="e.g. E-Commerce App" value={form.title}
            onChange={e => setForm({...form, title: e.target.value})} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="textarea-field" placeholder="Describe your project..." value={form.description}
            onChange={e => setForm({...form, description: e.target.value})} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Technologies (comma-separated)</label>
            <input className="input-field" placeholder="React, Java, MySQL" value={form.technologies}
              onChange={e => setForm({...form, technologies: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input className="input-field" placeholder="web, fullstack" value={form.tags}
              onChange={e => setForm({...form, tags: e.target.value})} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>GitHub URL</label>
            <input className="input-field" placeholder="https://github.com/..." value={form.githubUrl}
              onChange={e => setForm({...form, githubUrl: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Live URL</label>
            <input className="input-field" placeholder="https://..." value={form.liveUrl}
              onChange={e => setForm({...form, liveUrl: e.target.value})} />
          </div>
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input className="input-field" placeholder="https://..." value={form.thumbnailUrl}
            onChange={e => setForm({...form, thumbnailUrl: e.target.value})} />
        </div>

        {isEdit && (
          <div className="form-group">
            <label>Status</label>
            <select className="select-field" value={form.status}
              onChange={e => setForm({...form, status: e.target.value})}>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditProjectPage;
