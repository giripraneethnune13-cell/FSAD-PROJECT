import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import MyProjectsPage from './pages/MyProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CreateEditProjectPage from './pages/CreateEditProjectPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjectsPage from './pages/AdminProjectsPage';
import AdminStudentsPage from './pages/AdminStudentsPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import { useAuth } from './context/AuthContext';

function AppLayout() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      {user && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute role="STUDENT"><MyProjectsPage /></ProtectedRoute>
        } />
        <Route path="/projects/new" element={
          <ProtectedRoute role="STUDENT"><CreateEditProjectPage /></ProtectedRoute>
        } />
        <Route path="/projects/edit/:id" element={
          <ProtectedRoute role="STUDENT"><CreateEditProjectPage /></ProtectedRoute>
        } />
        <Route path="/projects/:id" element={
          <ProtectedRoute><ProjectDetailPage /></ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/projects" element={
          <ProtectedRoute role="ADMIN"><AdminProjectsPage /></ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute role="ADMIN"><AdminStudentsPage /></ProtectedRoute>
        } />

        {/* Public */}
        <Route path="/portfolio/:userId" element={<PublicPortfolioPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
