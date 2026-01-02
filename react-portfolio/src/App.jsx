import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/BlogPost/BlogPost';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import useMetrics from './hooks/useMetrics';

const MetricsTracker = () => {
  useMetrics();
  return null;
};

const App = () => {
  return (
    <Router>
      <MetricsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/adm"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
