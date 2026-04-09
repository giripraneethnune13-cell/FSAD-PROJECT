import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiZap } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLanding = location.pathname === '/';

  return (
    <nav className={`navbar ${isLanding ? 'navbar-transparent' : ''}`} id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <FiZap className="brand-icon" />
          <span className="brand-text">ProjectFolio</span>
        </Link>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link
                to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                className="nav-link"
              >
                Dashboard
              </Link>
              <div className="nav-user">
                <FiUser />
                <span>{user.fullName}</span>
                <span className="nav-role-badge">{user.role}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary nav-register-btn">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
