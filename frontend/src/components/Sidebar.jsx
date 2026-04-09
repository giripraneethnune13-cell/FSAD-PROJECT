import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome, FiFolder, FiPlusCircle, FiUsers, FiGrid,
  FiMessageSquare, FiBarChart2
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const { isStudent, isAdmin } = useAuth();

  const studentLinks = [
    { to: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { to: '/projects', icon: <FiFolder />, label: 'My Projects' },
    { to: '/projects/new', icon: <FiPlusCircle />, label: 'New Project' },
  ];

  const adminLinks = [
    { to: '/admin', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/admin/projects', icon: <FiFolder />, label: 'All Projects' },
    { to: '/admin/students', icon: <FiUsers />, label: 'Students' },
  ];

  const links = isAdmin() ? adminLinks : studentLinks;

  return (
    <aside className="sidebar" id="main-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-section">
          <span className="sidebar-section-title">Navigation</span>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard' || link.to === '/admin'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
