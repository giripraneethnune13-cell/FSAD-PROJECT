import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowRight, FiLayers, FiTarget, FiMessageSquare, FiUploadCloud } from 'react-icons/fi';
import './LandingPage.css';

const LandingPage = () => {
  const { user } = useAuth();

  const features = [
    { icon: <FiLayers />, title: 'Project Showcase', desc: 'Display your projects with descriptions, tags, and live previews.' },
    { icon: <FiUploadCloud />, title: 'Media Uploads', desc: 'Upload screenshots, documents, and media to enrich your portfolio.' },
    { icon: <FiTarget />, title: 'Milestone Tracking', desc: 'Set goals, track progress, and celebrate achievements.' },
    { icon: <FiMessageSquare />, title: 'Expert Feedback', desc: 'Receive ratings and feedback from teachers and mentors.' },
  ];

  return (
    <div className="landing-page" id="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="hero-content animate-fade-in-up">
          <span className="hero-badge">✨ Student Portfolio Platform</span>
          <h1 className="hero-title">
            Showcase Your <span className="gradient-text">Projects</span> &amp;
            Build Your <span className="gradient-text-pink">Portfolio</span>
          </h1>
          <p className="hero-subtitle">
            A modern platform for students to present their work, track milestones,
            and receive feedback from mentors. Stand out with a professional portfolio.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link
                to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                className="btn-primary hero-btn"
              >
                Go to Dashboard <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary hero-btn">
                  Get Started Free <FiArrowRight />
                </Link>
                <Link to="/login" className="btn-secondary hero-btn">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-inner">
          <h2 className="section-title">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-inner glass-card">
          <h2>Ready to Build Your Portfolio?</h2>
          <p>Join students who are already showcasing their amazing work.</p>
          <Link to="/register" className="btn-primary hero-btn">
            Create Your Account <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 ProjectFolio. Built for students, by students.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
