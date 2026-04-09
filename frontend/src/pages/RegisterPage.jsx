import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/api';
import { FiUser, FiMail, FiLock, FiZap, FiBookOpen } from 'react-icons/fi';
import './AuthPages.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', role: 'STUDENT', department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerUser(form);
      login(res.data);
      navigate(res.data.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" id="register-page">
      <div className="auth-container animate-fade-in-up">
        <div className="auth-header">
          <div className="auth-logo"><FiZap /></div>
          <h1>Create Account</h1>
          <p>Join ProjectFolio and showcase your work</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><FiUser /> Full Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label><FiMail /> Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label><FiLock /> Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label><FiBookOpen /> Department</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Computer Science"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <div className="role-toggle">
              <button
                type="button"
                className={`role-btn ${form.role === 'STUDENT' ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: 'STUDENT' })}
              >
                🎓 Student
              </button>
              <button
                type="button"
                className={`role-btn ${form.role === 'ADMIN' ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: 'ADMIN' })}
              >
                👨‍🏫 Admin
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
